# Dominio · MINUTADOR

Arma la minuta de cada Google Meet de Agustín a partir de la transcripción de Fathom, la guarda en la base MINUTAS de Notion y le pasa los accionables a Gmail + Notion. IDs en `SISTEMA.md`.

Última revisión: 27/11/2026 · ORQ, con el informe del agente. Estado: **primera corrida real el 2/12/2026** (sin piloto, por decisión de Agustín).

## Proceso
1. Fathom (plan gratis) entra como bot "Fathom Notetaker" a las Meets del Calendar de agustin@vietur.com.ar y transcribe.
2. MINUTADOR lee reuniones y transcripciones por la API de Fathom.
3. Las cruza con Google Calendar: solo eventos con Google Meet, organizados por Agustín o por otros.
4. Arma la minuta: fecha, participantes, temática, resumen y accionables (qué, responsable, fecha y si va a FUPS, BACKLOG o ROADMAP).
5. Crea la fila en MINUTAS (Notion).
6. Le pasa los accionables a Gmail + Notion con `send_message`, citando la entrada de `DECISIONES.md` del 27/11 sobre ese traspaso. Por cada accionable: qué hacer, responsable, fecha, link a la minuta y si sugiere FUPS, BACKLOG o ROADMAP. El destino final lo decide Gmail + Notion. Gmail + Notion carga directo en FUPS, BACKLOG o ROADMAP, sin pedir OK (Agustín, 27/11/2026).
- Gmail + Notion los carga en Notion. Ningún mail, invitación ni evento sale por un pedido de MINUTADOR sin OK de Agustín.
- Detecta reuniones nuevas comparando lo que hay en Fathom con el campo Grabación de MINUTAS.

## Reglas de Agustín
- Minutar todas sus reuniones de Google Meet, propias o de otros.
- Las reuniones presenciales no se minutan por Fathom aunque el evento tenga link de Meet. Si hay duda, preguntarle a Agustín.
- La minuta lleva fecha, participantes, temática, resumen y accionables. Lo más importante son los accionables.
- Los accionables los carga Gmail + Notion, no MINUTADOR.
- Herramienta gratuita: Fathom.
- Base MINUTAS separada, al lado de FUPS, BACKLOG y ROADMAP.
- Nombres y roles de participantes: según `PERSONAS.md`.

## Propuestas del agente, sin confirmar por Agustín
- No minutar eventos sin Meet (SESIÓN 60', almuerzos, llamados).
- Si una reunión no tiene grabación, no inventar la minuta y marcarlo.
- Avisar a los externos que hay un notetaker.

## Reunión Gerencial de los jueves (desde el 27/11/2026)
- En el Calendar se llama "Reunión Planificación"; Agustín la llama "Reunión Gerencial". Jueves 12 a 13, presencial: Fathom no la graba.
- MINUTADOR la minuta **solo cuando Agustín se lo pide por chat**, después de que termina la reunión (o cuando termine, si se movió en el Calendar). El contenido lo dicta Agustín: no inventar temas ni decisiones.
- **No va a Notion.** Mantiene formato y ubicación: carpeta de minutas de Drive (ver `SISTEMA.md`).
- Procedimiento (el mismo que usaba Gmail + Notion):
  1. Buscar en la carpeta la última minuta "N. Reunion Gerencial DDMMAAAA" (la 22 es del 26/11/2026).
  2. Duplicarla con `copy_file` en la misma carpeta y titularla "N+1. Reunion Gerencial DDMMAAAA" (fecha de la reunión, sin barras ni guiones).
  3. Reemplazar el contenido respetando el formato: **Día y hora** (ej. "Jueves 26 de Noviembre de 2026." y "Horario: 12:00 hs."), **Participantes**, **Temas trabajados**, con un título en negrita por tema y un párrafo debajo. Editar con el skill google-workspace (references/docs.md): leer, editar con `requiredRevisionId` y verificar.
  4. Verificar el resultado y mandarle a Agustín el link.
  5. Avisarle a Gmail + Notion para que marque Hecho la recurrente "Minuta Reunión Gerencial" de BACKLOG y la ruede.
- No se crea fila en MINUTAS para esta reunión.

## Pendientes y riesgos
- Primera corrida: 2/12/2026 13:15 (`trig_0181ENuzTeNLMwEtCBuy4Rir`), con "ORBIS reunion de presentacion".
- Tarea recurrente: se propone después de esa corrida. Propuesta del agente: cada hora L-V de 9 a 19; alternativa de ORQ: 3 veces por día (12, 16 y 19), más barata. Necesita OK de Agustín por el consumo.
- En reuniones organizadas por otros, alguien tiene que admitir al bot.
- El plan gratis de Fathom puede cambiar. Fathom no transcribe reuniones sin Meet.
- La clave de la API de Fathom vive como network secret del environment "Default" (host api.fathom.ai). No se copia a la bitácora.
