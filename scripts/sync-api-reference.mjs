import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const input=process.argv[2];
if(!input)throw new Error('Pass the verified backend OpenAPI file; do not generate from a planned contract.');
const schema=JSON.parse(readFileSync(input,'utf8'));
const methods=new Set(['get','post','patch','put','delete','head','options']);
const operations=Object.entries(schema.paths).flatMap(([path,item])=>Object.entries(item).filter(([method])=>methods.has(method)).map(([method,operation])=>({path,method,operation})));
if(!schema.openapi?.startsWith('3.')||!operations.length||operations.some(({path})=>!path.startsWith('/api/v1/')))throw new Error('Unexpected API contract');
const snapshot=JSON.stringify(schema,null,2)+'\n';
writeFileSync('public/openapi.json',snapshot);
const hash=createHash('sha256').update(snapshot).digest('hex');
const rows=operations.map(({path,method,operation})=>`| \`${method.toUpperCase()} ${path}\` | ${operation.security?.length?'Clerk bearer':'Public / handler-specific'} | ${operation.summary?.replaceAll('|','\\|')||operation.operationId} |`).join('\n');
writeFileSync('content/docs/api/endpoints.mdx',`---\ntitle: Complete route index\ndescription: Generated operations from the verified unified backend OpenAPI contract.\n---\n\nThis snapshot contains **${Object.keys(schema.paths).length} declared paths and ${operations.length} operations**. It describes the unified first-party API, including mutations. Optional provider routes may still return unavailable; a declared route is not proof of provider activation. Read [availability](/docs) and [authentication](/docs/concepts/authentication) first.\n\n[Download this exact schema](/openapi.json) or [inspect the deployed schema](https://api.farz.app/openapi.json). Snapshot SHA-256: \`${hash}\`. The API root redirect and framework schema-serving route are outside this operation index.\n\n| Method and complete path | OpenAPI security | Operation |\n| --- | --- | --- |\n${rows}\n\nRequest parameters, required headers, request bodies, response schemas and validation constraints are specified in the JSON contract. Runtime authorization, conflict, entitlement, freshness and rate-limit errors are also explained in the [error guide](/docs/concepts/errors); generated responses do not enumerate every service error.\n`);
console.log(`Generated ${operations.length} operations across ${Object.keys(schema.paths).length} paths.`);
const guides=JSON.parse(readFileSync(new URL('./api-guides.json',import.meta.url),'utf8'));
for(const [slug,paths] of Object.entries(guides)){
 const file=`content/docs/api/${slug}.mdx`;
 const introduction=readFileSync(file,'utf8').split('\n| Complete route')[0];
 const models=new Set();const guideRows=[];
 for(const path of paths){
  if(!schema.paths[path])throw new Error(`Guide ${slug} has unknown path ${path}`);
  for(const [method,operation] of Object.entries(schema.paths[path])){
   if(!methods.has(method))continue;
   const headers=(operation.parameters||[]).filter(p=>p.in==='header'&&p.required).map(p=>`\`${p.name}\``);
   const body=operation.requestBody?.content?.['application/json']?.schema;
   if(body?.$ref)models.add(body.$ref.split('/').at(-1));
   const responses=[];
   for(const [status,response] of Object.entries(operation.responses)){
    if(!status.startsWith('2'))continue;
    for(const [type,content] of Object.entries(response.content||{})){
     const ref=content.schema?.$ref||content.schema?.items?.$ref;
     if(ref)models.add(ref.split('/').at(-1));
     responses.push(`${status} ${type}${ref?' '+ref.split('/').at(-1)+(content.schema?.type==='array'?'[]':''):''}`);
    }
   }
   guideRows.push(`| \`${method.toUpperCase()} ${path}\` | ${headers.join(', ')||'—'} | ${responses.join('; ')||'See schema'} |`);
  }
 }
 let content=introduction+'\n| Complete route | Required operation headers (besides authentication) | Declared success |\n| --- | --- | --- |\n'+guideRows.join('\n')+'\n\n## Exact request/response models\n\nThese JSON Schema definitions are generated from the verified contract, not sample financial records. Resolve `$ref` entries through [OpenAPI JSON](/openapi.json). All query/body constraints and additional operations appear in the [complete index](/docs/api/endpoints).\n';
 for(const name of [...models].sort()){
  const model=schema.components.schemas[name];if(!model)throw new Error(`Missing model ${name}`);
  content+=`\n### ${name}\n\n\`\`\`json\n${JSON.stringify(model,null,2)}\n\`\`\`\n`;
 }
 writeFileSync(file,content);
}
console.log(`Synchronized exact model definitions for ${Object.keys(guides).length} resource guides.`);
