import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const schemaText=readFileSync('public/openapi.json','utf8');
const schema=JSON.parse(schemaText);
const methods=new Set(['get','post','patch','put','delete','head','options']);
const expected=Object.entries(schema.paths).flatMap(([path,item])=>Object.keys(item).filter(m=>methods.has(m)).map(m=>`${m.toUpperCase()} ${path}`)).sort();
const index=readFileSync('content/docs/api/endpoints.mdx','utf8');
const declared=[...index.matchAll(/\| `((?:GET|POST|PATCH|PUT|DELETE|HEAD|OPTIONS) \/api\/v1\/[^`]+)`/g)].map(m=>m[1]).sort();
assert.deepEqual(declared,expected,'Complete index must include exactly every declared operation');
assert(index.includes(createHash('sha256').update(schemaText).digest('hex')),'Schema fingerprint drift');
const guides=JSON.parse(readFileSync('scripts/api-guides.json','utf8'));
for(const [slug,paths] of Object.entries(guides)){
 const content=readFileSync(`content/docs/api/${slug}.mdx`,'utf8');
 for(const path of paths)assert(schema.paths[path],`Unknown ${slug} path`);
 for(const match of content.matchAll(/### (\w+)\n\n```json\n([\s\S]*?)\n```/g))assert.deepEqual(JSON.parse(match[2]),schema.components.schemas[match[1]],`${slug}/${match[1]} schema drift`);
}
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${dir}/${e.name}`):e.name.endsWith('.mdx')?[`${dir}/${e.name}`]:[]);
const files=walk('content/docs');
const routes=new Set(files.map(f=>'/docs/'+f.slice('content/docs/'.length,-4).replace(/(?:^|\/)index$/,'' )).map(r=>r.replace(/\/$/,'')));
for(const file of files){
 const text=readFileSync(file,'utf8');
 for(const m of text.matchAll(/\]\((\/docs[^)#\s]*)(?:#[^)]*)?\)/g))assert(routes.has(m[1].replace(/\/$/,'')),`Broken docs link ${file}: ${m[1]}`);
 assert(!/FARZ_API_KEY|farz_at_01|farz_rt_01/.test(text),`Unavailable credential example in ${file}`);
}
const home=readFileSync('app/(home)/page.tsx','utf8');
assert(!home.includes('FARZ_API_KEY')&&!home.includes('/api/developer/v1/accounts'),'Homepage must use public live example');
const account=schema.components.schemas.AccountResponse;
assert.equal(account.properties.balance.type,'string');
assert.equal(schema.paths['/api/v1/workspaces/{workspace_id}/accounts'].get.responses['200'].content['application/json'].schema.type,'array');
assert.equal(schema.paths['/api/v1/workspaces/{workspace_id}/transactions'].get.parameters.find(p=>p.name==='limit').schema.default,100);
assert(schema.paths['/api/v1/workspaces/{workspace_id}/lending/{loan_id}/reclaim']);
console.log(`Verified ${expected.length} operations, ${Object.keys(guides).length} exact-model guides and ${files.length} pages/links.`);
