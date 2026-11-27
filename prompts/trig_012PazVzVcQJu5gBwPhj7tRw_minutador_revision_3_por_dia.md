# trig_012PazVzVcQJu5gBwPhj7tRw · MINUTADOR · Revisión de reuniones (3 por día)

Estado: **vigente**. Cron `CRON_TZ=America/Argentina/Buenos_Aires 13 12,16,19 * * 1-5`: lunes a viernes a las 12:13, 16:13 y 19:13. Dispara en la sesión de MINUTADOR (`session_01Pa7M7g2Na4ZgaoacJGgF67`). Creada el 27/11/2026 a pedido de Agustín, vía ORQ (DECISIONES.md, commit 00a3748). Primer disparo: 27/11/2026 a las 19:13.

## Prompt (texto exacto)

Revisión programada de MINUTADOR: lunes a viernes a las 12:13, 16:13 y 19:13, hora Argentina. La decidió Agustín; está en DECISIONES.md, entrada "2026-11-27 · ORQ · Tarea recurrente de MINUTADOR…", commit 00a3748.

1. git pull en /home/user/vietur-bitacora. Releé REGLAS_VIGENTES.md y dominios/MINUTADOR.md: si contradicen este prompt, mandan ellos.
2. Fathom: GET https://api.fathom.ai/external/v1/meetings con header X-Api-Key: proxy-injected (el proxy pone la clave real). Traé las reuniones grabadas de los últimos 4 días y paginá con next_cursor.
3. Salteá las reuniones que ya tienen fila en MINUTAS: buscá su share_url en la propiedad Grabación del data source collection://4257be59-807c-81e0-81c8-000b9fd31e10. Salteá también la "Reunión Planificación" (Reunión Gerencial de los jueves): esa minuta va a Drive y solo a pedido de Agustín por chat.
4. Si no hay reuniones nuevas, terminá sin hacer nada y sin avisar.
5. Por cada reunión nueva:
   a. Traé la transcripción (include_transcript=true o el endpoint de transcript de recordings).
   b. Cruzala con el evento de Google Calendar: título, participantes e invitados. Usá PERSONAS.md para nombres y roles.
   c. Creá la fila en MINUTAS:
      - Propiedades: Reunión, Fecha, Participantes, Temática, Tipo (Equipo, Dirección o Externo), Accionables = "Pendiente de pase", Cantidad accionables, Grabación (share_url), Evento Calendar.
      - Cuerpo: Resumen (bullets cortos) y Accionables (qué, responsable, fecha si la hay y destino sugerido: FUPS, BACKLOG o ROADMAP).
      - No inventes nada que no esté en la transcripción. Si algo no se entiende, marcalo como dudoso.
   d. Si hay accionables, mandáselos a Gmail + Notion (session_01Pa7M7gUAcBbeZbqXmQUbpR) con send_message:
      - Citá la entrada de DECISIONES.md "2026-11-27 · Gmail + Notion · Accionables de MINUTADOR…" y la 4a7423f (ROADMAP se carga directo).
      - Por cada accionable: qué, responsable, fecha, link a la fila de MINUTAS y destino sugerido.
      - Después pasá Accionables a "Enviado a GMAIL + NOTION".
      - Si no hubo accionables, poné "Sin accionables" y no le mandes nada.
6. Reuniones con Meet en el Calendar ya terminadas que no tienen grabación en Fathom: no inventes minuta. Mencionáselas a Agustín en una línea, una sola vez por reunión (fijate en esta conversación si ya se la mencionaste), preguntándole si fue presencial. Los eventos sin Meet no se toman.
7. Si procesaste algo, mandale a Agustín un resumen corto: por cada reunión, título, cantidad de accionables y link. Sin reportes cuando no hubo nada.
8. Nada de mails, invitaciones ni eventos. Si Agustín marcó algún criterio nuevo, registralo en DECISIONES.md con commit y push.
