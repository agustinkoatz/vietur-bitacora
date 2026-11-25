# AGENTES

Registro de todos los agentes de Agustín. Lo mantiene ORQ. Si creás un agente, una tarea programada o cambiás un horario, avisale a ORQ para que lo registre acá.

Última revisión: 25/11/2026.

## Protocolo común (aplica a todos)

- **Arranque:** leer `REGLAS_VIGENTES.md` antes de trabajar. El resto de los archivos, solo si la tarea lo pide.
- **Cierre o compactación:** antes de que la sesión se compacte o se corte, o cuando Agustín lo pida, agregar en `DECISIONES.md` todo lo decidido que no esté registrado. Recién después se compacta o se abre una sesión nueva.
- **Escritura:** los agentes solo agregan entradas al final de `DECISIONES.md`. `REGLAS_VIGENTES.md` lo ordena ORQ.
- **Memoria propia:** cada agente puede tener su memoria de dominio (abajo, en "Memoria"). La bitácora tiene lo que vale para todos y el índice; si hay contradicción, manda la bitácora y se avisa a ORQ.

## Agentes activos

### ORQ · Orquestador
- **Qué hace:** coordina a los agentes, mantiene la bitácora y este registro. No hace el trabajo de otro agente.
- **Dónde corre:** sesión `session_01Pa7M7i8kbivcgUX2CUsG3j` ("Orquestador de agentes").
- **Tareas programadas:** "ORQ · Respaldo semanal de la bitácora en Drive" · `trig_01FWjftHJtBMNJy7E5tK8BEV` · viernes 19:07. Dispara en la misma sesión. Reemplaza el contenido del Doc de respaldo, sin crear ni borrar archivos.
- **Permisos y límites:** escribe en `vietur-bitacora`. Pide OK a Agustín antes de cualquier acción hacia afuera o difícil de deshacer (crear repos, enviar mails, borrar, cambiar tareas programadas o prompts, invitar). No cambia reglas de otros agentes sin OK.

### Gmail + Notion
- **Qué hace:** procesa Recibidos y Enviados de agustin@vietur.com.ar, carga y sigue FUP en Notion, rueda tareas repetitivas de BACKLOG, cruza Calendar, revisa borradores y manda el mail "Arranque del día".
- **Dónde corre:** sesión `session_01Pa7M7gUAcBbeZbqXmQUbpR` ("GMAIL + NOTION"). Reemplazó a "GMAIL AGENT" (`session_01Pa7M7ecfGShHe2Fa2hUt58`, archivada).
- **Tareas programadas** (ambas disparan en la misma sesión):
  - "Agente Gmail + Notion · Arranque del día" · `trig_01JpRV7QJdXyUzsUemiDLVSS` · L-V 8:20 (Buenos Aires). Manda el único mail del día.
  - "Agente Gmail + Notion · Revisión cada 2 horas" · `trig_01GTu76zWj9uWovUSkQJkJax` · L-V 9:20, 11:20, 13:20, 15:20, 17:20, 19:20. Sin mails.
- **Memoria:** `dominios/GMAIL_NOTION.md` de esta bitácora (desde el 25/11/2026). El Google Doc "Memoria del agente – Gmail" es histórico y está bloqueado contra edición. Prompts vigentes en `prompts/`.
- **Repo:** conectado a `vietur-bitacora` (lee todo; escribe solo en `DECISIONES.md`).
- **Permisos:** etiquetar (sin crear etiquetas), archivar solo FUP cargados y el informe de backup, escribir en FUPS y BACKLOG según reglas, borrar eventos verdes ya pasados a BACKLOG y SESIÓN 60' según la regla de Gabriela.
- **Nunca:** enviar (salvo el Arranque a agustin@), reenviar, responder, crear/editar/borrar borradores sin pedido, invitar, tocar Google Tasks ni ROADMAP.

### Gerente de Ventas IA
- **Qué hace:** lee (solo lectura) las 4 casillas de ventas, clasifica con IA y manda el resumen diario de gestión comercial. Análisis a pedido.
- **Dónde corre:** sesión `session_01Pa7M7giud2ZzZRiPExnU1u` ("GERENTE DE VENTAS") + repo `agustinkoatz/vietur-gerente-ventas` + Google Cloud (proyecto `vietur-gerente-ventas`).
- **Tareas programadas:** no son de Claude. Cloud Scheduler `resumen-diario-1830` (L-V 18:30 Buenos Aires, sin feriados) dispara el Cloud Run job `resumen-diario`. Mail de agustin@ a agustin@, asunto "Resumen de ventas · <día> dd/mm" (viernes: "diario + semanal").
- **Memoria:** `CLAUDE.md` del repo `vietur-gerente-ventas` + documento de definición https://claude.ai/artifact/DHpYeCTN2KMU7A24h8fATs.
- **Bitácora:** conectado desde el 25/11/2026 (lee todo; escribe solo en `DECISIONES.md`).
- **Costo:** ~USD 0,02-0,05 por día L-J, ~USD 0,15-0,25 el viernes (crédito prepago de Anthropic, sin recarga automática).
- **Límites:** solo lectura de casillas; envío solo a agustin@. Pedidos de IA > USD 0,50 piden OK.

### Newton PM
- **Qué hace:** sigue el desarrollo de Newton en Trello y manda el resumen semanal.
- **Dónde corre:** sesión `session_01Pa7M7iGhqNWQFj1a8omqsq` ("NEWTON PRODUCT MANAGER").
- **Tareas programadas:** "Newton PM - Resumen semanal viernes" · `trig_016aycM1ajNRYeRc9SQyrvBU` · viernes 17:30. Dispara en la misma sesión.
- **Memoria:** Google Doc "Newton | Historial de resúmenes semanales" (`1zr_57QoClJHvNZ9syn2tXRy0QJKRB4nik1gDjIYKX5w`).
- **Bitácora:** conectado desde el 25/11/2026 (lee todo; escribe solo en `DECISIONES.md`).
- **Límites:** un solo mail por semana a agustin@. Trello en lectura.
- **Ojo:** no archivar su sesión: ahí caen el resumen y las consultas ad hoc.

### Briefing diario (Infobae + Ladevi)
- **Qué hace:** arma y manda el briefing de noticias e inteligencia competitiva.
- **Dónde corre:** sesión de referencia `session_01Pa7M7gDtccV2jDxkGqR5R7` ("BRIEFING DIARIO"). Cada corrida abre una sesión nueva (modelo Sonnet, solo conector Gmail).
- **Tareas programadas:**
  - "Briefing diario | Infobae + Ladevi" · `trig_01XHqXLEFnui8vdpgUkC1uq4` · todos los días 8:32 (incluye fines de semana).
  - "Revisión semanal del briefing" · `trig_015KHpgTgTP8KqjBQRSy9h1z` · una sola vez, 02/12/2026 9:00, en la sesión de referencia. Propone ajustes, no los aplica.
- **Límites:** un mail por día a agustin@, control de duplicados antes de enviar.

### VIE NEWS
- **Qué hace:** revisa los textos semanales del VIE NEWS que manda Dámaris y propone correcciones para Agustín y un mensaje listo para Dámaris.
- **Dónde corre:** sesión `session_01Pa7M7gLunZMuKat5FFgVVh` ("VIE NEWS RESUMEN SEMANAL").
- **Tareas programadas:** "Revisión semanal VIE NEWS" · `trig_01NhZnKRN4cFdnCydfV7BBQH` · viernes cada hora de 8:38 a 18:38. Dispara en la misma sesión.
- **Límites:** no envía, no responde, no crea borradores. Solo crea/aplica la etiqueta "VIE NEWS-revisado". Push corto cuando hay revisión.

## Sesiones que no son agentes

- "SKILL DE REDACCIÓN AK" (`session_01Pa7M7j6DKwDYBhcHx765QF`): armó la skill `agustin-koatz-voz`, que ya está activa en la cuenta. Archivada el 25/11/2026 con OK de Agustín.
- "GMAIL AGENT" (`session_01Pa7M7ecfGShHe2Fa2hUt58`): archivada, reemplazada por Gmail + Notion.

## Cómo registrar un agente nuevo

1. Nombre, qué hace, sesión, tareas programadas (ID y horario), memoria propia, permisos y límites.
2. ORQ le manda el protocolo de arranque y cierre.
3. Entrada en `DECISIONES.md`: fecha, "alta de agente", quién lo pidió.
