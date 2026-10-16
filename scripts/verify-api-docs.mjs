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
const covered=new Set();
const labels={HTTPBearer:'Clerk user bearer',ClerkWebhookSignature:'Clerk Svix signature',ResendSignature:'Resend Svix signature'};
for(const [path,item] of Object.entries(schema.paths))for(const [method,operation]of Object.entries(item)){
 if(!methods.has(method))continue;
 const row=index.split('\n').find(line=>line.startsWith(`| \`${method.toUpperCase()} ${path}\` |`));
 if(operation.security?.length)for(const group of operation.security)for(const name of Object.keys(group))assert(row.includes(labels[name]),`Security label drift for ${path}`);
 else assert(row.includes('Public / handler-specific'),`Public route mislabeled ${path}`);
}
const guides=JSON.parse(readFileSync('scripts/api-guides.json','utf8'));
for(const [slug,paths] of Object.entries(guides)){
 const content=readFileSync(`content/docs/api/${slug}.mdx`,'utf8');
 const requiredModels=new Set();
 const expectedRoutes=[];
 for(const path of paths){
  assert(schema.paths[path],`Unknown ${slug} path`);assert(!covered.has(path),`Duplicate guide assignment ${path}`);covered.add(path);
  for(const [method,operation]of Object.entries(schema.paths[path])){
   if(!methods.has(method))continue;
   expectedRoutes.push(`${method.toUpperCase()} ${path}`);
   const body=operation.requestBody?.content?.['application/json']?.schema;
   if(body?.$ref)requiredModels.add(body.$ref.split('/').at(-1));
   for(const [status,response] of Object.entries(operation.responses))if(status.startsWith('2'))for(const media of Object.values(response.content||{})){
    const ref=media.schema?.$ref||media.schema?.items?.$ref;if(ref)requiredModels.add(ref.split('/').at(-1));
   }
  }
 }
 const declaredRoutes=[...content.matchAll(/\| `((?:GET|POST|PATCH|PUT|DELETE|HEAD|OPTIONS) \/api\/v1\/[^`]+)`/g)].map(m=>m[1]);
 assert.deepEqual(declaredRoutes.sort(),expectedRoutes.sort(),`${slug} route coverage drift`);
 const actualModels=[...content.matchAll(/### (\w+)\n\n```json/g)].map(m=>m[1]);
 assert.deepEqual(actualModels.sort(),[...requiredModels].sort(),`${slug} missing or extra generated models`);
 for(const match of content.matchAll(/### (\w+)\n\n```json\n([\s\S]*?)\n```/g))assert.deepEqual(JSON.parse(match[2]),schema.components.schemas[match[1]],`${slug}/${match[1]} schema drift`);
}
assert.deepEqual([...covered].sort(),Object.keys(schema.paths).sort(),'Every declared path must have one resource guide');
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${dir}/${e.name}`):e.name.endsWith('.mdx')?[`${dir}/${e.name}`]:[]);
const files=walk('content/docs');
const routes=new Set(files.map(f=>'/docs/'+f.slice('content/docs/'.length,-4).replace(/(?:^|\/)index$/,'' )).map(r=>r.replace(/\/$/,'')));
for(const file of files){
 const text=readFileSync(file,'utf8');
 for(const m of text.matchAll(/\]\((\/docs[^)#\s]*)(?:#[^)]*)?\)/g))assert(routes.has(m[1].replace(/\/$/,'')),`Broken docs link ${file}: ${m[1]}`);
 assert(!/FARZ_API_KEY|farz_at_01|farz_rt_01/.test(text),`Unavailable credential example in ${file}`);
}
const navigation=JSON.parse(readFileSync('content/docs/api/meta.json','utf8'));
for(const slug of Object.keys(guides))assert(navigation.pages.includes(slug),`Unlisted guide ${slug}`);
const summary=readFileSync('docs.md','utf8');assert(!/FARZ_API_KEY|Create an API key|Paste your Farz user API key/.test(summary),'Stale developer setup in root guide');
const home=readFileSync('app/(home)/page.tsx','utf8');
assert(home.includes(`${Object.keys(schema.paths).length} declared paths and ${expected.length} read/write operations`),'Homepage contract counts drift');
assert(!home.includes('FARZ_API_KEY')&&!home.includes('/api/developer/v1/accounts'),'Homepage must use public live example');
const account=schema.components.schemas.AccountResponse;
assert.equal(account.properties.balance.type,'string');
assert.equal(schema.paths['/api/v1/workspaces/{workspace_id}/accounts'].get.responses['200'].content['application/json'].schema.type,'array');
assert.equal(schema.paths['/api/v1/workspaces/{workspace_id}/transactions'].get.parameters.find(p=>p.name==='limit').schema.default,100);
assert(schema.paths['/api/v1/workspaces/{workspace_id}/lending/{loan_id}/reclaim']);
console.log(`Verified ${expected.length} operations, ${Object.keys(guides).length} exact-model guides and ${files.length} pages/links.`);
