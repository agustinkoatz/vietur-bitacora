# Dominio · Presupuestos Europamundo

Carga semanal de los presupuestos de PARTICULARES del portal de Europamundo en el Sheet de Davetur, que después los contacta por mail. IDs en `SISTEMA.md`. Prompt vigente en `prompts/trig_01HRnXfeumK9A7XtuggHyYtd_presupuestos_europamundo.md` (con credenciales redactadas).

Última revisión: 27/11/2026 · ORQ, con el informe del agente.

## Contexto de negocio
- VIETUR es distribuidor oficial de Europamundo. Europamundo comparte con sus mayoristas oficiales (4, VIETUR es uno) los presupuestos que se arman en su web, de particulares y de agencias. Los otros 3 reciben los mismos datos: la velocidad importa.
- VIETUR es mayorista B2B y no le vende al público. Por eso a los particulares se los contacta desde **Davetur** (ventas@davetur.com.ar), una casilla que funciona como agencia minorista. Los mails salen firmados por "Pablo, del equipo de Davetur, agencia de viajes".
- VIETUR trabaja solo los presupuestos de particulares. A las agencias no se las contacta nunca: sería conflicto de canal.

## Proceso de los jueves
1. **10:12** · tarea `trig_01HRnXfeumK9A7XtuggHyYtd` en sesión nueva (conector Google Sheets de la tarea). Entra al portal europamundo-online.com con Playwright, busca presupuestos con "Buscar por: Todos" y baja el Excel de la temporada actual y la siguiente (de enero a abril, también la anterior).
2. Lee el Sheet: el último presupuesto cargado (columna H) marca el inicio de la ventana; excluye los números ya cargados.
3. Filtra particulares de la ventana, deduplica por mail y aplica las reglas de abajo.
4. Controles: con 0 o más de 80 mails no pega y avisa.
5. Pega al final del Sheet con la columna J vacía y verifica. Push al terminar.
6. **11:00 a 11:30** · el Apps Script del Sheet (`enviarMailsAutomatico`, activador semanal) manda los mails desde ventas@davetur.com.ar, marca ENVIADO y manda un resumen a agustin@vietur.com.ar. Google no deja fijar el minuto exacto.
- El agente no manda mails: el envío lo hace el Apps Script.

## Reglas de Agustín
- Solo particulares. A agencias, nunca. Se descarta:
  - el dominio que también cotiza como Agencia en el portal;
  - los dominios `.tur.ar`;
  - mails o dominios con palabras de turismo (viaj, travel, tour, turismo, agenc, ventas, operador, reserva, booking, vyt, evt, pasaje y similares);
  - mails que contienen el nombre de una agencia del portal (ej. "taiar");
  - un mail "Particular" que también fue cotizado por una agencia.
- Lista negra: Lucas Osuna (lucasozuna@gmail.com), nunca.
- Fuera: mails propios o de Europamundo (vietur, davetur, europamundo), dominios mal escritos, los que parecen basura y los de viajes que ya salieron.
- Dominio de empresa sin palabras de turismo: dudoso, no se manda (criterio conservador del agente).
- Un mail por persona por corrida (el presupuesto más reciente). Entre semanas distintas sí se puede repetir.
- Ventana: del día siguiente al último presupuesto cargado hasta ayer.
- Topes: la carga no pega con 0 o más de 80; el Apps Script no envía con más de 80 pendientes. Siempre hay resumen a agustin@vietur.com.ar.
- Los mails salen antes de las 12.

## Credenciales
- Usuario y clave del portal: viven solo en el prompt real de la tarea `trig_01HRnXfeumK9A7XtuggHyYtd`. Es un usuario dedicado a esto, autorizado por Agustín. No se copian a la bitácora ni a memorias. Si cambia la clave, el agente actualiza ese prompt con OK de Agustín en su chat.

## Riesgos conocidos
- Primera corrida automática: jueves 3/12. El agente tiene un chequeo a las 11:45 (`trig_01FdvCnzYhzbroXFFaNVpAL1`).
- Si la carga tarda más de ~50 minutos, el envío corre antes y no manda nada esa semana. Los mails salen el jueves siguiente.
- Si Europamundo cambia el Excel o el login, la tarea falla sin pegar (control de encabezados).
- El código del Apps Script vive en el Sheet; copia en `respaldos/davetur_apps_script/Codigo.gs`.
- Opción de baja en los mails: Agustín decidió no agregarla (27/11/2026). No volver a proponerla.
- Correrlo 2 veces por semana para ganar velocidad: sugerido, no decidido.
