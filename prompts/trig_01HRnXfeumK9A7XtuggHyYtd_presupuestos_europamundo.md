# trig_01HRnXfeumK9A7XtuggHyYtd · Presupuestos Europamundo (jueves)

Versión VIGENTE (aplicada y verificada con get_trigger el 27/11/2026). Agente dueño: Presupuestos Europamundo (session_01Pa7M7iZHUiTBACpS1TXn7o).
Cron: `CRON_TZ=America/Argentina/Buenos_Aires 12 10 * * 4` (jueves 10:12 ART). Corre en sesión nueva por disparo, con el conector Google Sheets configurado en la tarea. Notificación push al terminar.
Usuario y clave del portal REDACTADOS en esta copia: viven solo en el prompt de la tarea.

---

Tarea semanal (jueves 10:12 ART): cargar en el Google Sheet los presupuestos de PARTICULARES de Europamundo de la última semana, ya limpios. Vos NO mandás mails: el envío lo hace el Apps Script del Sheet solo, entre las 11:00 y las 11:30, así que la carga tiene que estar terminada antes de las 11. Respondé en español rioplatense.

DATOS
- Sheet: spreadsheetId 15746MMuwXqj_K7YLjSuYiu2JFs-NjL67EfNEXdsp96Y, pestaña 'Listado de Presupuestos (1)', columnas A:L (encabezado en fila 1). Se usa con el conector Google Sheets.
- Portal: https://www.europamundo-online.com — usuario y clave: [NO SE COPIAN ACÁ — viven solo en el prompt real de la tarea] (usuario dedicado a esto; el dueño autorizó usarlo acá).

PASOS
1. Creá una carpeta de trabajo en tu scratchpad y escribí ahí, TEXTUALES, los dos archivos de abajo (con heredoc 'EOF').
2. Descarga: EMU=<usuario> EMP=<clave> NODE_PATH=$(npm root -g) node em_download.js <carpeta>/dl  (crear dl antes; timeout largo, 10 min). Si falla, reintentá 2 veces con 1 min de espera. Si sigue fallando, NO pegues nada y terminá informando el error.
3. Leé el Sheet con get_values rango 'Listado de Presupuestos (1)'!A1:L5000. Si el resultado es grande y queda guardado en un archivo, copiá ese archivo como sheet.json; si vuelve inline, guardalo como sheet.json (formato {"values": [...]}).
4. Corré: python3 -I em_semana.py sheet.json dl/raw*.xls  (desde la carpeta de trabajo). Genera append.json y reporte.txt.
5. Controles antes de pegar: si el reporte tiene "ALERTA", o append.json está vacío, o tiene más de 80 filas, NO pegues y terminá informando. 
6. Pegá con append_values (range 'Listado de Presupuestos (1)'!A1) exactamente las filas de append.json, sin cambiar nada. Las filas tienen 12 columnas; la J NO debe decir ENVIADO.
7. Verificá con get_values que las filas nuevas quedaron al final y que la cantidad coincide.
8. Cerrá con un resumen corto: cuántos se pegaron, cuántos se descartaron y por qué (lista breve del reporte), y cualquier anomalía. No toques ninguna otra fila, no borres nada, no mandes mails.

=== em_download.js ===
// Uso: EMU=usuario EMP=clave NODE_PATH=$(npm root -g) node em_download.js <carpeta>
const { chromium } = require('playwright'); const path=require('path');
(async () => {
  const out=process.argv[2]; const now=new Date(Date.now()-3*3600e3); const Y=now.getUTCFullYear(), M=now.getUTCMonth()+1;
  const temps=(M<=4?[Y-1,Y,Y+1]:[Y,Y+1]).map(String);
  const b=await chromium.launch(); const ctx=await b.newContext({acceptDownloads:true}); const p=await ctx.newPage(); p.setDefaultTimeout(300000);
  await p.goto('https://www.europamundo-online.com/Default.asp',{waitUntil:'domcontentloaded'});
  await p.fill('#operador',process.env.EMU); await p.fill('#pwd',process.env.EMP);
  await Promise.all([p.waitForLoadState('domcontentloaded'),p.click('form button[type=submit]')]);
  if (!/Midia|Reservas/i.test(p.url())) throw new Error('Login falló: '+p.url());
  for (const t of temps) {
    await p.goto('https://www.europamundo-online.com/Presupuestos/ListadoPresupuesto.asp?temp='+t+'&valor=&buscar=procurar&campo=presupuestosvigentes',{waitUntil:'domcontentloaded'});
    const opts=await p.$$eval('select[name=temp] option',os=>os.map(o=>o.value)); if(!opts.includes(t)){console.log('temporada',t,'no existe, salteo');continue;}
    await p.selectOption('select[name=temp]',t); await p.check('input[name=campo][value=todos]');
    await Promise.all([p.waitForLoadState('domcontentloaded'),p.click('input[name=buscar]')]);
    const tot=await p.$eval('body',b=>(b.innerText.match(/Total\s+(\d+)/)||[])[1]); console.log('temporada',t,'total',tot);
    const [dl]=await Promise.all([p.waitForEvent('download'),p.evaluate(()=>document.getElementById('formExcel').submit())]);
    const f=path.join(out,'raw'+t+'.xls'); await dl.saveAs(f); console.log('guardado',f);
  }
  await b.close();
})().catch(e=>{console.error('ERROR',e.message);process.exit(1)});

=== em_semana.py ===
# Uso: python3 -I em_semana.py sheet.json raw*.xls  -> append.json + reporte.txt
import sys,re,html,json,collections,datetime as D
GENERIC={'gmail.com','hotmail.com','yahoo.com.ar','yahoo.com','outlook.com','live.com','icloud.com','hotmail.com.ar','outlook.com.ar',
'live.com.ar','hotmail.es','yahoo.es','me.com','msn.com','fibertel.com.ar','speedy.com.ar','arnet.com.ar','ciudad.com.ar','outlook.es',
'yahoo.com.mx','hotmail.it','live.com.mx','gmail.com.ar','protonmail.com','proton.me','aol.com','uolsinectis.com.ar','sinectis.com.ar',
'tutopia.com','yahoo.com.br','hotmail.fr','gmx.com','gmx.net','telecentro.com.ar','personal.com.ar','movistar.com.ar','claro.com.ar',
'outlook.com.br','googlemail.com','ymail.com','rocketmail.com','tiscali.it','libero.it','yahoo.it','gigared.com','hotmail.com.br','bol.com.br','uol.com.br'}
TYPO={'gmai.com','gmial.com','gmail.co','hotmial.com','hotmail.co','hotmai.com','yaho.com','gamil.com','gnail.com','hotmal.com','outlok.com','gmail.con','hotmail.con'}
KW=['viaj','travel','turism','tour','agenc','operador','ventas','reserva','booking','vyt','evt','pasaje','holiday','vacacion','trip',
'destino','excursion','receptivo','mayorista','emisivo','cruceros','promar','tickets','aereo','hotel']
TUR_OK=['arturo','artur','turco','saturn','natur','futur','tortur','mature','turner','turin','turi','fortun','cultur','estatur','captur','postur','literatur','apertur']
BLACKLIST={'lucasozuna@gmail.com'}          # Lucas Osuna: nunca
OWN=['vietur','davetur','europamundo','europa-mundo']
MAX_ENVIO=80
def load_raw(p):
    s=open(p,encoding='utf-8').read()
    rows=[[html.unescape(c).strip() for c in re.findall(r'<t[dh]>(.*?)</t[dh]>',r,re.S)] for r in re.findall(r'<tr>(.*?)</tr>',s,re.S)]
    rows=[r for r in rows if r]
    assert rows[0][5]=='EMAIL' and rows[0][6]=='AGENCIA O PARTICULAR', 'formato de Excel cambió: '+str(rows[0])
    return rows[1:]
def kw_hit(x):
    if 'turism' in x: return ['turismo']
    for w in TUR_OK: x=x.replace(w,'')
    h=[k for k in KW if k in x]
    if re.search(r'(^|[^a-z])tur([^a-z]|$)|tur(es|ismo)',x): h.append('tur')
    return h
def classify(e,agdom,agem,stems):
    if not re.match(r'^[^@\s]+@[^@\s]+\.[a-z]{2,}$',e): return 'mail inválido'
    local,dom=e.split('@')
    if any(o in e for o in OWN): return 'propio / Europamundo'
    if e in BLACKLIST or re.search(r'lucas\.?o[sz]una',e): return 'lista negra'
    if dom in TYPO: return 'dominio mal escrito'
    if dom in agdom: return 'dominio de agencia (cotiza como Agencia)'
    if dom.endswith('.tur.ar'): return 'dominio .tur.ar'
    if dom not in GENERIC:
        k=kw_hit(dom.split('.')[0]) or kw_hit(local)
        return ('dominio propio con palabra de turismo: '+','.join(k)) if k else 'dominio propio (empresa): dudoso, no se manda'
    k=kw_hit(local)
    if k: return 'palabra de agencia en el mail: '+','.join(k)
    for s in stems:
        if s in local and s not in TUR_OK: return f'contiene nombre de agencia "{s}"'
    if re.search(r'(.)\1{4,}',local) or re.search(r'[bcdfghjklmnpqrstvwxz]{7,}',local): return 'parece basura'
    if e in agem: return 'también lo cotizó una agencia con ese mail'
    return None
sh=json.load(open(sys.argv[1]))['values'][1:]
raws=[]
for f in sys.argv[2:]: raws+=load_raw(f)
agdom=set(); agem=set()
for r in raws:
    if r[6]=='Agencia':
        e=r[5].lower().strip(); agem.add(e)
        if '@' in e and e.split('@')[1] not in GENERIC: agdom.add(e.split('@')[1])
stems={d.split('.')[0] for d in agdom if len(d.split('.')[0])>=5}
fechas=[r[7] for r in sh if len(r)>7 and re.fullmatch(r'20\d{6}',r[7])]
last=max(fechas); sentp={r[0] for r in sh if r}
hoy=(D.datetime.now(D.timezone.utc)-D.timedelta(hours=3)).date()
hasta=(hoy-D.timedelta(days=1)).strftime('%Y%m%d'); hoys=hoy.strftime('%Y%m%d')
new=[r for r in raws if r[6]=='Particular' and last<r[7]<=hasta and r[0] not in sentp]
best={}
for r in sorted(new,key=lambda r:(r[7],r[0])): best[r[5].lower().strip()]=r
ok=[];drop=[]
for e,r in best.items():
    why=classify(e,agdom,agem,stems)
    if not why and r[2]<=hoys: why='el viaje ya salió'
    (drop if why else ok).append((r,why))
ok.sort(key=lambda x:x[0][7]); drop.sort(key=lambda x:x[0][7])
rep=[f'Ventana: presupuestos del {last[6:]}/{last[4:6]} (excl.) al {hasta[6:]}/{hasta[4:6]} (incl.)',
     f'Filas de particulares nuevas: {len(new)} | mails únicos: {len(best)} | A ENVIAR: {len(ok)} | descartados: {len(drop)}']
if not ok: rep.append('ALERTA: 0 mails para enviar. Revisar.')
if len(ok)>MAX_ENVIO: rep.append(f'ALERTA: {len(ok)} mails supera el máximo {MAX_ENVIO}. NO PEGAR.')
rep.append('-- A ENVIAR'); rep+=[f'  {r[7]} {r[5]} | {r[1]}' for r,_ in ok]
rep.append('-- DESCARTADOS'); rep+=[f'  {r[7]} {r[5] or "(vacío)"} | {r[1]} | {w}' for r,w in drop]
json.dump([r for r,_ in ok],open('append.json','w'),ensure_ascii=False)
open('reporte.txt','w').write('\n'.join(rep)); print('\n'.join(rep))
