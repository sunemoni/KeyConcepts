import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import * as XLSX from 'xlsx';
function load(path, deps, names) {
 const source = readFileSync(path,'utf8').replace(/^import .*;\n/gm,'').replace(/^export /gm,'');
 const js = ts.transpile(source, {target:ts.ScriptTarget.ES2022, module:ts.ModuleKind.ESNext});
 return new Function(...Object.keys(deps), js + `\nreturn {${names.join(',')}};`)(...Object.values(deps));
}
const security = load('lib/inquiry-security.ts',{},['isOwner','privateHeaders','csvCell','topics']);
const rows = new Map();
const env = { DB: { prepare() {
 return {
  bind(...args) { return { async run() { rows.set(args[0], args); return {success:true}; } }; },
  async all() { return { results: [...rows.values()].map(r => Object.fromEntries(['id','submitted_at','first_name','last_name','email','phone','query_type','question'].map((k,i) => [k,r[i]]))) }; }
 };
} } };
const {POST}=load('app/api/inquiries/route.ts',{env,...security},['POST']);
const {GET}=load('app/api/inquiries/export/route.ts',{env,XLSX,...security},['GET']);
const input={id:crypto.randomUUID(),firstName:'Client',lastName:'Test',email:'client@example.com',phone:'425-555-0100',type:'Property Management',question:'=SUM(1,2)\nPlease help with my property.'};
const request=(data,origin='https://site.test')=>new Request('https://site.test/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify(data)});
assert.equal((await POST(request(input))).status,201);assert.equal(rows.size,1);
assert.equal((await POST(request(input))).status,201);assert.equal(rows.size,1);
assert.equal((await POST(request({...input,question:'x'.repeat(2501)}))).status,400);
assert.equal((await POST(request({...input,email:'bad'}))).status,400);
assert.equal((await POST(request(input,'https://attacker.test'))).status,403);
assert.equal((await GET(new Request('https://site.test/api/inquiries/export'))).status,403);
assert.equal((await GET(new Request('https://site.test/api/inquiries/export',{headers:{'oai-authenticated-user-id':'other','oai-authenticated-user-email':'client@example.com'}}))).status,403);
const exported=await GET(new Request('https://site.test/api/inquiries/export',{headers:{'oai-authenticated-user-id':'owner','oai-authenticated-user-email':'sunemoni@gmail.com'}}));
assert.equal(exported.status,200);
assert.ok(exported.headers.get('Content-Disposition').includes('.xlsx'));
const workbook=XLSX.read(await exported.arrayBuffer(),{type:'array'});
const sheet=workbook.Sheets['Customer Queries'];
const values=XLSX.utils.sheet_to_json(sheet,{header:1});
assert.equal(values.length,2);assert.equal(values[1][6],'Property Management');
assert.equal(values[1][7],input.question);assert.equal(sheet.H2.t,'s');assert.equal(sheet.H2.f,undefined);

const broken=load('app/api/inquiries/route.ts',{env:{DB:{prepare(){throw new Error('offline')}}},...security},['POST']);assert.equal((await broken.POST(request(input))).status,500);
console.log('Passed: saving, retry deduplication, validation, cross-origin rejection, anonymous/non-owner export denial, owner Excel export, Excel text-cell safety, database failure.');
