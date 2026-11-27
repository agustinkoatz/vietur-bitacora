# Dominio · MINUTADOR

Arma la minuta de cada Google Meet de Agustín a partir de la transcripción de Fathom, la guarda en la base MINUTAS de Notion y le pasa los accionables a Gmail + Notion. IDs en `SISTEMA.md`.

Última revisión: 27/11/2026 · ORQ, con el informe del agente. Estado: **en prueba, todavía no en producción**.

## Proceso
1. Fathom (plan gratis) entra como bot "Fathom Notetaker" a las Meets del Calendar de agustin@vietur.com.ar y transcribe.
2. MINUTADOR lee reuniones y transcripciones por la API de Fathom.
3. Las cruza con Google Calendar: solo eventos con Google Meet, organizados por Agustín o por otros.
4. Arma la minuta: fecha, participantes, temática, resumen y accionables (qué, responsable, fecha y si va a FUPS, BACKLOG o ROADMAP).
5. Crea la fila en MINUTAS (Notion).
6. Le pasa los accionables a Gmail + Notion con `send_message`, citando la entrada de `DECISIONES.md` del 27/11 sobre ese traspaso. Por cada accionable: qué hacer, responsable, fecha, link a la minuta y si sugiere FUPS, BACKLOG o ROADMAP. El destino final lo decide Gmail + Notion.
- Gmail + Notion los carga en Notion. Ningún mail, invitación ni evento sale por un pedido de MINUTADOR sin OK de Agustín.
- Detecta reuniones nuevas comparando lo que hay en Fathom con el campo Grabación de MINUTAS.

## Reglas de Agustín
- Minutar todas sus reuniones de Google Meet, propias o de otros.
- La minuta lleva fecha, participantes, temática, resumen y accionables. Lo más importante son los accionables.
- Los accionables los carga Gmail + Notion, no MINUTADOR.
- Herramienta gratuita: Fathom.
- Base MINUTAS separada, al lado de FUPS, BACKLOG y ROADMAP.
- Nombres y roles de participantes: según `PERSONAS.md`.

## Propuestas del agente, sin confirmar por Agustín
- No minutar eventos sin Meet (SESIÓN 60', almuerzos, llamados).
- Si una reunión no tiene grabación, no inventar la minuta y marcarlo.
- Avisar a los externos que hay un notetaker.

## Reunión Gerencial de los jueves
- Gmail + Notion ya arma esa minuta en Drive con lo que dicta Agustín. Mientras Agustín no defina si la de Notion la reemplaza, conviven o se excluye, MINUTADOR **no** minuta la Gerencial.

## Pendientes y riesgos
- Agustín tiene que activar en Fathom la grabación automática de todas las reuniones y el idioma español, y hacer la prueba piloto (MINUTA-1).
- Tarea programada: se crea después del piloto. Propuesta del agente: cada hora L-V de 9 a 19. Necesita OK de Agustín por el consumo.
- En reuniones organizadas por otros, alguien tiene que admitir al bot.
- El plan gratis de Fathom puede cambiar. Fathom no transcribe reuniones sin Meet.
- La clave de la API de Fathom vive como network secret del environment "Default" (host api.fathom.ai). No se copia a la bitácora.
