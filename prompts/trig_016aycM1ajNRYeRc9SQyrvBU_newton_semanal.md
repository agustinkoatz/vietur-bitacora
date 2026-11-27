# Newton PM - Resumen semanal viernes

- ID: `trig_016aycM1ajNRYeRc9SQyrvBU`
- Horario: viernes 17:30 (`CRON_TZ=America/Argentina/Buenos_Aires 30 17 * * 5`)
- Sesión: `session_01Pa7M7iGhqNWQFj1a8omqsq` (NEWTON PRODUCT MANAGER)
- Estado: VIGENTE desde el 27/11/2026 (suma el mail a Alberto, paso 2b; aplicado y verificado con get_trigger). Versiones anteriores en el historial de git.

## Prompt

```text
Es viernes 17:30 (hora Argentina): toca el RESUMEN SEMANAL DE NEWTON. Sos el agente Product Manager de Newton para Agustín (Gerente Comercial de VIETUR). Hacé lo siguiente:

0) BITÁCORA: git pull en /home/user/vietur-bitacora y leé REGLAS_VIGENTES.md, dominios/NEWTON_PM.md y las entradas de DECISIONES.md de Newton PM posteriores a la 'Última revisión' de tu dominio. Si chocan con este prompt, mandan las de la bitácora y avisalo en el chat.

1) DATOS (conector Trello). Tablero "DESARROLLO NEWTON": https://trello.com/b/ubQB5nDv/desarrollo-newton (ARI ari:cloud:trello::board/workspace/656f1bc2526ec54b5e36d4e1/6ac3c8b15f4ee3fae6169f92).
- Ventana: lunes 00:00 a viernes 17:30 de esta semana (America/Argentina/Buenos_Aires, UTC-3). Lo que haya pasado entre el viernes anterior 17:30 y el lunes 00:00 va en un bloque aparte, "Fuera de horario (fin de semana)", si existe.
- Usá trelloReadBoard list_activity, filtrando por tipos SIN adjuntos (COMMENT, CREATE_CARD, MOVE_CARD, UPDATE_CARD_CLOSED, UPDATE_CARD_COMPLETE, UPDATE_CARD_DUE, UPDATE_CARD_CHECK_ITEM_STATE, ADD_MEMBER, COPY_CARD, CREATE_CARD_FROM_CHECK_ITEM), porque los adjuntos rotos hacen fallar la llamada. Paginá hasta cubrir toda la ventana. Si la salida se guarda en un archivo, procesala con python.
- Leé también las listas EN PROCESO y PENDIENTE DE RESPUESTA CLIENTE (trelloReadCard list_by_list) para ver el estado actual y detectar las tarjetas trabadas.
- Listas del tablero: SPRINT 1, MEJORAS - ROAD MAP, PRIORIDAD, EN PROCESO, TERMINADOS MES N (N se va actualizando, puede haber una nueva), PENDIENTE DE RESPUESTA CLIENTE (el "cliente" es VIETUR), INFORMACION y MEJORAS ROAD MAP FINALIZADO.
- Personas: Eduardo Denuble (PM), Nicolas Rosso y Fraan Sanchez (devs), Gustavo Cabral (producto y carga, del lado de VIETUR) y Agustín (vos le escribís a él).

2) MAIL (Gmail send_message, htmlBody) a agustin@vietur.com.ar. Asunto: "Newton | Resumen semanal DD/MM al DD/MM". En español rioplatense, directo y sin relleno. Usá el mismo formato del mail de prueba del 23/11, que también está en el Google Doc:
- "En 1 minuto": 5 a 8 bullets con lo clave (qué se terminó, qué entró nuevo, qué está trabado y la lectura de fondo de la semana).
- "Alertas", arriba de todo, en 3 sub-bloques:
  (a) Pedidos y decisiones que le tocan a Agustín: menciones a él, preguntas a Producto, gerencia o comercial, decisiones de negocio abiertas.
  (b) Temas que pegan en lo comercial: bugs o caídas que afectan a agencias o webs, proveedores XML o API, precios o disponibilidad mal mostrados, marcas blancas.
  (c) Trabados: tarjetas en EN PROCESO o PENDIENTE sin comentarios ni movimiento hace más de 5 días hábiles, o con bloqueos explícitos (esperando a un proveedor o a VIETUR). Agregá un "para vigilar" con las tarjetas movidas a En proceso que no tienen comentarios.
- "Detalle por ticket", agrupado por estado: TERMINADOS / EN CURSO CON AVANCE / NUEVOS DE LA SEMANA / TRABADOS. Cada ticket lleva el título con link a la tarjeta, de qué se trata, qué se avanzó y qué quedó pendiente. Marcá si algo dice "terminado" pero no hay confirmación de que esté en producción.
- SIN bloque ni métricas por persona (lo pidió así). Los nombres aparecen solo cuando hacen falta para entender quién tiene la pelota.
- Pie: "Fuente: Trello. Lo que se habló fuera de Trello no aparece acá."
- Si la semana tuvo poca actividad, decilo en una línea; no inventes.

2b) MAIL A ALBERTO (Gmail send_message, htmlBody, includeSignature=true) a acrupnicoff@vietur.com.ar, enseguida después del mail de Agustín. Asunto: "Newton | Resumen semanal DD/MM al DD/MM". Es una versión informativa y más suave del mismo resumen. Copiá el formato del mail enviado a Alberto el 27/11/2026 (el ejemplo está en la bitácora, en prompts/trig_016aycM1ajNRYeRc9SQyrvBU_newton_semanal.md):
- Arranca con "Hola" a secas y la línea "Te comparto el resumen de lo que se trabajó en Newton esta semana (lunes DD/MM al viernes DD/MM)."
- Bloques: "En pocas palabras" (3 a 5 bullets), "Lo que se terminó", "En qué se está trabajando" y "Lo que viene".
- Le hablás a Alberto de "vos"; a Agustín lo nombrás en tercera persona ("Agustín la está revisando"). Sale de la casilla de Agustín, con su firma.
- Tono informativo, no dramático, sin ocultar hechos. Incluí las resoluciones (por ejemplo, que un cliente no va a usar algo), los incidentes ya resueltos contados con calma y el trabajo de Gustavo en Newton.
- Sacá: alertas de seguridad, la lista de trabados y lo que no se mueve, dudas de costos sin respuesta, lo que no está confirmado en producción y los riesgos abiertos. Lo pendiente se cuenta como "en curso" o "se está definiendo".
- Sin links a Trello, sin jerga técnica (nada de preprod, API, GDS ni nombres de tarjetas) y sin pie de "Fuente".
- Sin la leyenda de cierre "Avisame si esta información te sirve así...": esa fue solo para el primer envío, el del 27/11.
- Preguntas solo con signo de cierre. Si la semana tuvo poca actividad, decilo en una línea; no inventes.

3) ARCHIVO. Agregá la semana al final del Google Doc "Newton | Historial de resúmenes semanales" (id 1zr_57QoClJHvNZ9syn2tXRy0QJKRB4nik1gDjIYKX5w), con un título H2 "Semana DD/MM al DD/MM/AAAA" y el mismo contenido. Antes, leé el skill google-workspace (references/docs.md): read_doc, insertar en endIndex-1 con requiredRevisionId y verificar. Si falla la edición del Doc, mandá el mail igual y avisalo en este chat.

4) En este chat, dejá 3 líneas con lo más importante y la confirmación de que salieron los dos mails (Agustín y Alberto). Después quedás disponible para las consultas de Agustín, consultando Trello en vivo y el Doc como memoria.

5) Si Agustín te marca un cambio o un criterio nuevo, agregalo en el momento al final de DECISIONES.md (commit y push a main) y, si cambia esta tarea, actualizá este prompt y su copia en prompts/.
```

## Ejemplo aprobado del mail a Alberto (27/11/2026)

Formato aprobado por Agustín. El envío del 27/11 llevó además, al final, una leyenda que fue solo para esa vez y no se repite: "Avisame si esta información te sirve así. La idea es mantenerte al día, semana a semana, de lo que se está trabajando en Newton. Si en algún momento querés sacar o agregar algo, me decís y lo vemos juntos."

```html
<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#222;max-width:760px">

<p style="margin:0 0 12px">Hola</p>
<p style="margin:0 0 16px">Te comparto el resumen de lo que se trabajó en Newton esta semana (lunes 23/11 al viernes 27/11).</p>

<h3 style="margin:16px 0 6px">En pocas palabras</h3>
<ul>
<li>Semana muy productiva: el equipo <b>terminó 10 trabajos</b> y sumó 7 pedidos nuevos.</li>
<li><b>ONVIA ya está en Newton</b> como proveedor propio, separado de Europamundo, y se ve en vietur.com.ar desde el 25/11. Además se creó la versión en portugués para TEX, con 71 circuitos.</li>
<li><b>Newton está mucho más rápido.</b> La página de inicio carga en menos de 1 segundo y las búsquedas con filtros, en unos 2 o 3 segundos.</li>
<li><b>Requisitos migratorios:</b> se sacaron de la ficha de todos los circuitos, en Newton y en las marcas blancas. En su lugar aparece una leyenda fija que le pide a la agencia y al pasajero que consulten los requisitos según su nacionalidad y pasaporte. Gustavo lo validó y está en producción desde el 25/11.</li>
</ul>

<h3 style="margin:18px 0 6px">Lo que se terminó</h3>
<ul>
<li><b>ONVIA:</b> además de estar publicado, Gustavo probó el proceso de reserva y los detalles que encontró se corrigieron en el día. Quedan algunos ajustes menores de presentación que pidió Producto, como el orden de las secciones de la ficha.</li>
<li><b>Velocidad del buscador:</b> se encontraron y corrigieron las causas de la demora, tanto en la página de inicio como en el listado de circuitos y en los filtros.</li>
<li><b>Acceso al Admin:</b> el martes 24/11 hubo un problema que no dejaba ingresar al Admin de Newton. Lo reportó Gustavo y quedó resuelto esa misma tarde.</li>
<li><b>Admin de Newton:</b> ahora se entra a cada circuito con doble click, sin tener que moverse por toda la pantalla. Eso agiliza el trabajo de carga.</li>
<li><b>Sitio de VIETUR:</b> se agregó en el pie de página el acceso al blog.</li>
<li><b>Servidores:</b> se entregó un análisis de recursos y costos para identificar posibles ahorros.</li>
</ul>

<h3 style="margin:18px 0 6px">En qué se está trabajando</h3>
<ul>
<li><b>Búsqueda por ciudades:</b> se va a poder buscar por ciudad de inicio, por ciudad de fin y por las ciudades que recorre el circuito. La versión de prueba ya está lista y Agustín la está revisando antes de publicarla.</li>
<li><b>Surland temporada 2027-2028 en portugués:</b> ya está integrado y los circuitos se cargan el lunes 30/11. TEX confirmó que no lo va a usar, así que no se le habilita; queda definir a qué otros clientes sí.</li>
<li><b>Carga semiautomática de tours:</b> sube los tarifarios de los proveedores y arma los circuitos casi completos, lo que ahorra mucho tiempo de carga manual. Gustavo hizo la primera prueba y dio buenos resultados. Se están definiendo con Producto los criterios comerciales (tarifas y markup) para terminarla.</li>
</ul>

<h3 style="margin:18px 0 6px">Lo que viene</h3>
<ul>
<li>Mejoras en el Admin para trabajar más rápido: que recuerde los filtros al volver de un circuito y filtros por fecha para encontrar circuitos viejos. Además, Gustavo pidió que el listado de proveedores aparezca en orden alfabético.</li>
</ul>

</div>
```
