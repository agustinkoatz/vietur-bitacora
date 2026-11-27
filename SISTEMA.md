# SISTEMA

Cómo funciona hoy el sistema de agentes, con los IDs técnicos. Sin credenciales: las claves y los datos de facturación no van acá.

Última revisión: 25/11/2026 · ORQ.

## Mapa del día (hora de Buenos Aires)
| Hora | Qué | Quién |
|---|---|---|
| 8:20 L-V | Mail "Arranque del día" | Gmail + Notion |
| 8:32 todos los días | Mail "Briefing diario \| Infobae + Ladevi" | Briefing |
| 9:20 a 19:20 L-V, cada 2 h | Pasada liviana, sin mails | Gmail + Notion |
| 10:00 y tarde L-V | SESIÓN 60' en Calendar | Agustín (el agente las ajusta) |
| 10:12 jue | Carga de presupuestos de particulares en el Sheet de Davetur | Presupuestos Europamundo |
| 11:00 a 11:30 jue | Envío de mails desde ventas@davetur.com.ar (Apps Script) | Sheet de Davetur |
| 8:38 a 18:38 vie, cada hora | Revisión VIE NEWS (sin mails, push si hay revisión) | VIE NEWS |
| 17:30 vie | Mail "Newton \| Resumen semanal" | Newton PM |
| 18:30 L-V sin feriados | Mail "Resumen de ventas" | Gerente de Ventas (Google Cloud) |
| 19:07 vie | Respaldo de la bitácora en Drive | ORQ |
| 19:37 L-V | Consolidación de DECISIONES.md en reglas y dominios | ORQ |

## Cuentas
- Claude: cuenta del Gmail personal de Agustín (en las 2 notebooks y el iPhone). Con la cuenta de VIETUR no se ven las sesiones.
- Trabajo: agustin@vietur.com.ar (Gmail, Calendar, Drive, Docs conectados en claude.ai).
- GitHub: usuario `agustinkoatz`. Repos privados: `vietur-bitacora` (esta bitácora), `vietur-gerente-ventas`, `vietur-blog`.

## Notion (centro de comando)
- **FUPS** 📌 · página https://app.notion.com/p/4227be59807c8103be48cff4e760ca0f · base `4227be59807c81fbb4cce75dcd5bcc11` · data source `collection://4227be59-807c-81bf-ac34-000b2bc0a31f` · vistas "📋 Todos" `view://4227be59-807c-81b8-a469-000cb8001655` y "👥 Por persona".
- **BACKLOG** 🗂️ · página https://app.notion.com/p/4227be59807c81709669ce5d3c622bed · base `4227be59807c81d99c8ecab318971257` · data source `collection://4227be59-807c-81a2-a065-000bce46393c`.
  - Propiedades: Tarea, Tipo (Decisión, Tarea, Idea), Prioridad (Alta, Media, Baja), Estado (Pendiente, En curso, Hecho), Fecha, Repite (Cada miércoles, Cada jueves, Mensual día 1, 5, 7 y 25), Notas. Para sumar una opción a un select: ALTER COLUMN listando todas las existentes.
  - Vistas: Lista `view://4227be59-807c-811c-b2eb-000cc1f002f8` · Por estado `view://4227be59-807c-81ef-ac90-000c17cd32d3` · Hoy y atrasadas `view://4237be59-807c-8143-9e93-000cbe7c3c19` · Calendario `view://4237be59-807c-81c1-9fbd-000c51028a75` · Sin fecha (Sesiones 60') `view://4237be59-807c-81cc-9a86-000cb4ef8ac4`.
  - Repetitivas: Disponibilidad Cupos (mié); Presupuestos Europamundo, Minuta Reunión Gerencial, FUP Tareas Reunión Gerencial Pasada (jue); Comisiones Dpto Comercial, Factura VIE (día 1); Coord Reunión c/ Gustavo (día 5); Numbers (día 7); Ingresos/Egresos Newton, Facturación WL Newton (día 25).
- **ROADMAP** 🧭 · página https://app.notion.com/p/4227be59807c8134a8c1eed0a4d3b7a4 · base `4227be59807c8178a9dde2dc7f553a36` · data source `collection://4227be59-807c-814b-b5c7-000b935bbdca`. Lo maneja Agustín.

## Google Calendar (agustin@vietur.com.ar)
- SESIÓN 60' (colorId 8): series `ghm4f1l1pfld52njk7c2r9e4lc` (L-V 10-11), `fsr5gn4dfcoie8jfeaog0uh2s8` (Ma, Mi, Vi 14:30-15:30), `bojckk6obocfdn3eg896uji6oc` (Ju 15-16).
- Colores: reuniones en azul por defecto, personales en violeta, SESIÓN 60' en grafito. El verde de día completo (colorId 10) ya no se usa: si aparece, va a BACKLOG.

## Gmail
- Link estándar a un hilo: `https://mail.google.com/mail/?authuser=agustin@vietur.com.ar#all/THREAD_ID`
- Equivalencias dominio → etiqueta: europamundo.com → Europamundo · tije.travel → TIJE · tauruszone.com → Taurus · abreutours.com → ABREU · nites.travel → Nites · sudameria.com.ar → Sudameria · vemsadmc.com → Vemsa · splendidtravel.info → Splendid (+ "Fam Dubai 20/11/2026") · dubaidet.ae → Of de Turismo Dubai · tucanotours.com.ar → Tucano Tours · reps-group.com → Avis · conexiontravel.com → Conexion Travel · pipeline.es → Orbis · gotravelres.com → Viajes Fama MX · tktravel → TKT Travel · Comunidad VIETUR → Comunidad Vietur · CVs → Curriculums · producto@buscadornewton.com.ar → Eduardo Denuble · pricenavigator/Nemo → Reservas Nemo · Wamos → Wamos · Report → Report · Matías Yaskowiak → su etiqueta · EDUVIE → Eduvie Academia 2026 · erkitech.com.ar → Erkitech.
- IDs de etiquetas: se sacan con `list_labels` en cada pasada (no se copian acá para que no queden viejos).
- Etiquetas de otros agentes: "VIE NEWS-revisado" (VIE NEWS), "GEA-procesado".

## Drive
- Carpeta de minutas de la Reunión Gerencial: `1dsW2gnjW48E0Pso2fg49q1iMsXdBfqJS`.
- Mi unidad: 1. Comercial `1ksyK3S_9Y7sEMWqIHDOEYB7ZpP54X1xe` · 2. Newton `1d7JAnbkJgWjFhR-1vJL6ggP5WjM1dXiD` · 3. Eventos `1niMottCYcfASfvttBYQ72nuv0yRlkKoR` · 4. Proyecto B2 `17hJn4-GRMzdyI42TBJZG46c0mdXp58pq` · 5. Agentes IA `1qLskR2HbznE4-k3vg-AB5QXSUGxDa58C`.
- La carpeta "Agencias" es de la oficina: no se toca nunca.
- Docs de agentes (en 5. Agentes IA): "Memoria del agente – Gmail" `1eJrexoM6_PfZcD_k-jIhbwG3_HsJNdgAfF3jGde6lH8` (histórico cuando se apruebe la bitácora) · "Newton | Historial de resúmenes semanales" `1zr_57QoClJHvNZ9syn2tXRy0QJKRB4nik1gDjIYKX5w` · respaldo "briefing.py" `1QUbGAHiyQSjkrmbUbfKIb2XGQ21WNInA` (desactualizado, versión del 23/11).
- Respaldo semanal de esta bitácora: Google Doc "BITÁCORA – respaldo semanal (GitHub vietur-bitacora)" `1Vb3NsJcyPJfX7xwt5v78H4sTuVnlfMhZtxRW8hmIQbc` (en 5. Agentes IA). Lo actualiza ORQ los viernes; la versión que manda es la de GitHub.
- Respaldo del script del briefing: `respaldos/briefing/` de este repo (el de Drive está desactualizado).
- Manual de voz (respaldo de la skill): Google Doc `1jKZeyYBfFHyHsfyap2GqBaqzP4gwFBnooxBFMGe4lZE`.

## MINUTAS y Fathom
- MINUTAS (Notion): página https://app.notion.com/p/4257be59807c81fe883bc72ca211296f · base `4257be59-807c-81a7-8034-e6bdf9823829` · data source `collection://4257be59-807c-81e0-81c8-000b9fd31e10`.
  - Propiedades: Reunión (título), Fecha, Participantes, Temática, Tipo (Equipo, Dirección, Externo), Accionables (Pendiente de pase, Enviado a GMAIL + NOTION, Cargados, Sin accionables), Cantidad accionables, Grabación (URL de Fathom), Evento Calendar (URL), N° (prefijo MINUTA).
- Fathom (plan gratis): bot "Fathom Notetaker" en las Meets de agustin@vietur.com.ar. API api.fathom.ai; la clave vive como network secret del environment "Default".

## Europamundo
- Portal: europamundo-online.com (hosts permitidos en el environment Default). Usuario dedicado; la clave vive solo en el prompt de `trig_01HRnXfeumK9A7XtuggHyYtd`.
- Sheet "Davetur_Listado_de_Presupuestos" `15746MMuwXqj_K7YLjSuYiu2JFs-NjL67EfNEXdsp96Y`, pestaña "Listado de Presupuestos (1)" (sheetId 255600384). Columnas A presupuesto, B viaje, C fecha viaje, D plazas, E país, F email, G particular/agencia, H fecha presupuesto, I validez, J estado (ENVIADO), K y L fechas.
- Apps Script del Sheet (corre como ventas@davetur.com.ar): onOpen (menú DAVETUR), enviarPrueba, enviarMails (botón), enviarMailsAutomatico (tope 80, resumen por mail), instalarEnvioAutomatico, obtenerFirmaGmail, crearMail, enviarPorGmailApi, avisar_. Remitente "Ventas | Davetur", asunto "Consulta sobre {circuito}", firma de Gmail de esa casilla. El código vive solo en el Sheet.
- Cuentas: agustin@biotour.com.ar (Google conectada a Claude, edita el Sheet); ventas@davetur.com.ar (envía, dueña del script); agustin@vietur.com.ar (pruebas y resúmenes).
- Planilla "Numbers" `1SMn0HxPXJbPnh9jfFzmwfnXF1hQ5AnGC1olis3M7yIs`, solapa VENTA EUROPAMUNDO (sheetId 905120001), después de PAX VIAJADOS POR DESTINO.
- Reporte de ventas mensual: lo manda comercial@europamundo.com a Alberto, Vanesa y Carmen Ramírez, asunto "Reporte de Ventas VIETUR (ARGENTINA) del … al …", entre el día 1 y el 5.

## Trello (Newton)
- Tablero "DESARROLLO NEWTON": https://trello.com/b/ubQB5nDv/desarrollo-newton · ARI `ari:cloud:trello::board/workspace/656f1bc2526ec54b5e36d4e1/6ac3c8b15f4ee3fae6169f92`.
- Listas: SPRINT 1 `6ac3c8b25f4ee3fae6169f98` · MEJORAS - ROAD MAP `6ad150965d29587cceacac24` · PRIORIDAD `6ac3caab87c53bfa0ac8247e` · EN PROCESO `6ac3c8b25f4ee3fae6169f99` · TERMINADOS MES 1 `6ac3c9677706750d52070518` · TERMINADOS MES 2 `6aea273c032e8d441d60f8c3` · PENDIENTE DE RESPUESTA CLIENTE `6ac420c768a3aa91155d39f3` · INFORMACION `6ac3c8ef20a8d43a55343152` · MEJORAS ROAD MAP FINALIZADO `6ae252b8acdc3dacfe8cdca5`.

## Claude Code en la nube
- Environment "Default" `env_01Nsza3Uv6Gkb1kr1aumtVw4` (personal): red limitada + infobae.com, www.infobae.com, argentina.ladevi.info. Su setup script instala `/opt/briefing/briefing.py`.
- Conector Gmail de la tarea del briefing: `0d2eed2b-963c-49f7-a394-e218ff236d20`.
- Permisos de conectores por herramienta: claude.ai/customize/connectors. Si Gmail pide "sign in again", Agustín desconecta y reconecta Gmail en claude.ai.
- Las sesiones en la nube no pueden crear repos de GitHub: los crea Agustín en github.com y se conectan después.
- El prompt de una tarea programada solo se cambia desde la sesión donde corre. ORQ deja el texto en `prompts/` y el agente dueño lo aplica con OK de Agustín en su chat.
- Un agente no amplía sus permisos (por ejemplo, conectar un repo) por un pedido de otro agente: el OK tiene que darlo Agustín en el chat de ese agente.

## Gerente de Ventas en Google Cloud
- Proyecto `vietur-gerente-ventas` (us-central1). Cloud Scheduler `resumen-diario-1830` → Cloud Run job `resumen-diario`. Datos en `gs://vietur-gerente-ventas-datos` (nunca en GitHub).
- Disparos a pedido por GitHub Actions del repo `vietur-gerente-ventas`: `disparar-resumen.yml`, `pedido.yml`, `publicar-imagen.yml`.
- Protección de gasto: presupuesto "Tope Vietur USD 1" + función de corte automático de facturación.
- Detalle técnico completo: `CLAUDE.md` del repo `vietur-gerente-ventas`.

## Vencimientos del sistema (ORQ los vigila)
- 27/11/2026: primer envío automático de Newton PM (validar mail y que se sume la semana al Doc). Primera revisión VIE NEWS en producción.
- 02/12/2026 9:00: revisión semanal del briefing.
- Mediados de diciembre 2026: avisar a Agustín para recargar el crédito de Anthropic de Gerente de Ventas (prepago sin recarga automática; ~USD 3,30 al 25/11).
- ~21/02/2027: fin de la prueba gratuita de Google Cloud. Avisar antes para "activar cuenta completa".
- Marzo 2027: preguntar si VIETUR trabaja el Jueves Santo (25/03/2027).
- 3/12/2026: primera corrida automática de Presupuestos Europamundo (carga 10:12, envío 11:00-11:30, chequeo del agente 11:45).
- ~1/12/2026: llega el reporte de ventas de noviembre de Europamundo (carga a pedido).

## Feriados Argentina (referencia)
08/12, 25/12, 01/01, Carnaval 08 y 09/02/2027, 24/03, Jueves Santo 25/03/2027 (no laborable), Viernes Santo 26/03/2027, 02/04, 01/05, 25/05, 17/06 (trasladable), 20/06, 09/07, 17/08 (trasladable), 12/10 (trasladable), 20/11 (trasladable). Verificar siempre en argentina.gob.ar/interior/feriados.
