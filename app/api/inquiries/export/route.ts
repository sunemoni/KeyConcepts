import { env } from 'cloudflare:workers';
import * as XLSX from 'xlsx';
import { isOwner, privateHeaders } from '../../../../lib/inquiry-security';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
 if (!isOwner(request)) return Response.json({ error: 'Owner access required.' }, { status: 403, headers: privateHeaders });
 try {
  if (!env.DB) throw new Error('Database unavailable');
  const { results } = await env.DB.prepare('SELECT id, submitted_at, first_name, last_name, email, phone, query_type, question FROM inquiries ORDER BY submitted_at DESC').all();
  const columns = ['id','submitted_at','first_name','last_name','email','phone','query_type','question'];
  const labels = ['Query ID','Submitted at (UTC)','First name','Last name','Email','Phone','Query type','Question'];
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([labels, ...results.map(row => columns.map(key => String(row[key] ?? '')))]);
  worksheet['!cols'] = [ {wch:38}, {wch:26}, {wch:18}, {wch:18}, {wch:32}, {wch:20}, {wch:28}, {wch:80} ];
  worksheet['!autofilter'] = {ref: worksheet['!ref'] || 'A1:H1'};
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Customer Queries');
  const bytes = XLSX.write(workbook, {bookType:'xlsx', type:'array'});
  return new Response(bytes, { headers: { ...privateHeaders, 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Content-Disposition': `attachment; filename="Key_Concepts_Queries_${new Date().toISOString().slice(0,10)}.xlsx"`, 'X-Content-Type-Options': 'nosniff' } });
 } catch { return Response.json({error:'Export could not be prepared. Please try again.'}, {status:503,headers:privateHeaders}); }
}
