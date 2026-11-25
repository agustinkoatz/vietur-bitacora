mkdir -p /opt/briefing && cat > /opt/briefing/briefing.py <<'PYEOF'
import sys,re,json,html,subprocess as S,datetime as D,xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime as PD
TZ=D.timezone(D.timedelta(hours=-3));NOW=D.datetime.now(TZ);OUT='/tmp/briefing'
IB='https://www.infobae.com';LD='https://argentina.ladevi.info'
RUIDO=re.compile(r'/(peru|colombia|mexico|venezuela|centroamerica|agencias|horoscopo|loterias)/'
  r'|cotizacion|precio-del-(dolar|euro)|precio-de-la-luz|resultados-del-sorteo')
SECC=['','/ultimas-noticias/','/politica/','/economia/','/america/mundo/','/tecno/','/deportes/',
  '/sociedad/','/estados-unidos/','/america/']
LDS=['','/ultimas-noticias','/negocios','/traveltech','/actualidad','/transporte']
def get(u):
  r=S.run(['curl','-sL','-m','30','-A','Mozilla/5.0',u],capture_output=True);return r.stdout.decode('utf-8','replace')
def code(u):
  r=S.run(['curl','-sL','-m','30','-A','Mozilla/5.0','-o','/dev/null','-w','%{http_code}',u],capture_output=True);return r.stdout.decode()
def seen(a):
  if '--vistos' not in a:return set()
  return set(re.findall(r'https://(?:www\.infobae\.com|argentina\.ladevi\.info)/[^\s&"<>]+',open(a[a.index('--vistos')+1]).read()))
def candidatos(a):
  h=int(a[a.index('--horas')+1]) if '--horas' in a else 30;d=int(a[a.index('--dias')+1]) if '--dias' in a else 5;vis=seen(a)
  lim=NOW-D.timedelta(hours=h);c={}
  try:
    for it in ET.fromstring(get(IB+'/arc/outboundfeeds/rss/?outputType=xml').encode()).iter('item'):
      u=it.findtext('link','').split('?')[0];t=PD(it.findtext('pubDate')).astimezone(TZ)
      if t>=lim:c[u]=(t.strftime('%Y-%m-%d %H:%M'),it.findtext('title','').strip())
  except Exception as e:sys.stderr.write(f'RSS {e}\n')
  for s in SECC:
    for p in set(re.findall(r'href="(/[a-z0-9/-]+/(20\d\d)/(\d\d)/(\d\d)/[a-z0-9-]+/)"',get(IB+s))):
      f=D.datetime(int(p[1]),int(p[2]),int(p[3]),23,59,tzinfo=TZ);u=IB+p[0]
      if f>=lim and u not in c:c[u]=(f.strftime('%Y-%m-%d'),p[0].rstrip('/').split('/')[-1].replace('-',' '))
  print('# INFOBAE (fecha | url | titulo)')
  for u,(f,t) in sorted(c.items(),key=lambda x:x[1][0],reverse=True):
    if u not in vis and not RUIDO.search(u):print(f'{f} | {u} | {t}')
  lm={};fe={};sm=get(LD+'/sitemap.xml');N=lambda u:int(u.rsplit('-n',1)[1]);vid={N(u) for u in vis if LD in u}
  for u,m in re.findall(r'<loc>([^<]+)</loc><lastmod>([^<]+)</lastmod>',sm):lm[N(u)]=u;fe[N(u)]=m[:10]
  for s in LDS:
    for p in re.findall(r'href="(?:'+re.escape(LD)+r')?(/[a-z0-9/-]+-n\d{5,7})"',get(LD+s)):
      u=LD+p;k=N(u)
      if k not in lm or u.count('/')>lm[k].count('/'):lm[k]=u
  ids=sorted(lm,reverse=True);top=ids[0] if ids else 0
  print('# LADEVI (fecha | url | titulo) — sin fecha: se ve al abrir la nota')
  for k in ids:
    if k in vid or k<top-45*d:continue
    u=lm[k];print(f"{fe.get(k) or '?'} | {u} | {u.rsplit('/',1)[1].rsplit('-n',1)[0].replace('-',' ')}")
def texto(h):return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>','',h))).strip()
def nota(a):
  for u in a:
    p=get(u);t=re.search(r'property="og:title" content="([^"]*)"',p);f=re.search(r'"datePublished":"([^"]+)"',p) or re.search(r'published_time" content="([^"]+)"',p)
    b=re.search(r'"articleBody":"((?:[^"\\]|\\.)*)"',p);body=json.loads('"'+b.group(1)+'"') if b else ''
    if len(body)<300:
      ps=[texto(x) for x in re.findall(r'<p[^>]*>(.*?)</p>',p,re.S)];seen_=set()
      body='\n'.join(x for x in ps if len(x)>50 and not (x in seen_ or seen_.add(x)))
    print(f"=== {u}\nTITULO: {html.unescape(t.group(1)) if t else '?'}\nFECHA: {f.group(1) if f else '?'}\nHTTP: {'200' if p else 'ERROR'}\n{body}\n")
E=lambda s:html.escape(str(s).strip(),quote=True)
H=('<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>'
'<body style="margin:0;padding:22px 10px;background:#f4f5f3;font-family:Arial,Helvetica,sans-serif;color:#202428">'
'<div style="max-width:680px;margin:auto;background:#fff;border:1px solid #e1e3e4;border-radius:10px;padding:28px">'
'<div style="font-size:10px;letter-spacing:2px;font-weight:700;color:#777d82">BRIEFING PERSONALIZADO · INFOBAE + LADEVI</div>'
'<h1 style="font-size:29px;line-height:1.13;margin:12px 0 8px">Lo importante de hoy</h1><div style="font-size:13px;color:#697177">%FECHA% · Lectura estimada: 5–7 minutos</div>'
'<p style="font-size:13px;line-height:1.5;color:#596268;margin:16px 0">Una selección de noticias importantes y movimientos de la competencia, con contexto breve y enlaces originales.</p>'
'<div style="border-top:2px solid #22272a;margin:22px 0 18px"></div><div style="font-size:10px;color:#767e83;letter-spacing:1.4px;font-weight:bold">BLOQUE 1</div>'
'<h2 style="font-size:23px;margin:6px 0">Actualidad | Infobae</h2>%IB%<div style="border-top:3px solid #202428;margin:32px 0 19px"></div>'
'<div style="font-size:10px;color:#767e83;letter-spacing:1.4px;font-weight:bold">BLOQUE 2</div><h2 style="font-size:23px;margin:6px 0">Radar del turismo y la competencia | Ladevi</h2>%LD%'
'<div style="padding:22px 0 8px"><strong>En el radar</strong><p style="font-size:13px;line-height:1.5;color:#596168">%RADAR%</p></div>'
'<div style="border-top:1px solid #e1e3e4;margin-top:20px;padding-top:15px;color:#858b90;font-size:11px;line-height:1.5">%PIE%</div></div></body></html>')
PIE='Fuentes originales: Infobae y Ladevi Argentina. Las secciones de contexto y lectura comercial son interpretaciones, no declaraciones de los medios.'
A=('<div style="padding:17px 0;border-bottom:1px solid #eaebed"><p style="font-size:10px;font-weight:700;letter-spacing:1.3px;color:#7b8085;margin:0 0 8px">%N% / %F% · %D%</p>'
'<h3 style="font-size:18px;line-height:1.28;margin:0 0 8px;color:#1d2328">%T%</h3><p style="font-size:14px;line-height:1.5;margin:0 0 8px;color:#30363a">%R%</p>'
'<p style="font-size:13px;line-height:1.48;margin:0 0 10px;color:#596168"><strong>%L%:</strong> %X%</p>'
'<a href="%U%" style="font-size:12px;color:#285b80;text-decoration:underline">Leer nota original</a></div>')
def rep(s,d):
  for k,v in d.items():s=s.replace('%'+k+'%',v)
  return s
def armar(a):
  j=json.load(open(a[0]));err=[];txt=['BRIEFING PERSONALIZADO | INFOBAE + LADEVI',j['fecha'],''];bl={}
  for k,F,L in [('infobae','INFOBAE','Por qué importa'),('ladevi','LADEVI','Lectura comercial')]:
    o=''
    for i,n in enumerate(j[k],1):
      u=n['url'].strip();dom=IB if k=='infobae' else LD
      if not u.startswith(dom+'/'):err.append(f'URL fuera de fuente: {u}')
      c=code(u);pg=get(u) if c=='200' else '';slug=u.rstrip('/').rsplit('/',1)[-1]
      if c!='200' or 'og:title' not in pg or slug not in pg:err.append(f'URL no verificada (HTTP {c}): {u}')
      if not re.fullmatch(r'20\d\d-\d\d-\d\d',n['fecha'].strip()):err.append(f'fecha mal formada: {F} {i}')
      if re.match(r'(?i)lectura comercial',n['analisis'].strip()):err.append(f'analisis empieza con el rótulo: {F} {i}')
      o+=rep(A,{'N':str(i),'F':F,'D':E(n['fecha']),'T':E(n['titulo']),'R':E(n['resumen']),'L':L,'X':E(n['analisis']),'U':E(u)})
      txt+=[f"{F} #{i} · {n['titulo'].strip()}",n['resumen'].strip(),f"{L}: {n['analisis'].strip()}",u,'']
    bl[k]=o
  h=rep(H,{'FECHA':E(j['fecha']),'IB':bl['infobae'],'LD':bl['ladevi'],'RADAR':E(j['radar']),'PIE':PIE})
  txt+=['EN EL RADAR',j['radar'].strip(),'',PIE]
  if re.search(r'%[A-Z]+%',h):err.append('marcador sin reemplazar')
  if h.count('<div')!=h.count('</div>'):err.append('divs desbalanceados')
  if not re.fullmatch(r'\d\d/\d\d/\d{4}',j['fecha']):err.append('fecha mal formada')
  if len(j['infobae'])>8:err.append(f"Infobae tiene {len(j['infobae'])} notas: el máximo es 8")
  S.run(['mkdir','-p',OUT]);open(OUT+'/out.html','w').write(h);open(OUT+'/out.txt','w').write('\n'.join(txt))
  print(f"Infobae: {len(j['infobae'])} | Ladevi: {len(j['ladevi'])} | HTML: {OUT}/out.html | TXT: {OUT}/out.txt")
  print('ERRORES:\n'+'\n'.join(err) if err else 'OK: sin errores')
if __name__=='__main__':
  c=sys.argv[1] if len(sys.argv)>1 else '';f={'candidatos':candidatos,'nota':nota,'armar':armar}.get(c)
  f(sys.argv[2:]) if f else print('uso: briefing.py candidatos [--horas 30] [--dias 5] [--vistos f] | nota URL... | armar datos.json')
PYEOF
