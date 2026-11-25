# Dominio · Gerente de Ventas IA

La memoria completa de este agente es el `CLAUDE.md` del repo `agustinkoatz/vietur-gerente-ventas` y el documento de definición https://claude.ai/artifact/DHpYeCTN2KMU7A24h8fATs. Acá va solo el resumen que otros agentes necesitan.

Última revisión: 25/11/2026 · ORQ, con el volcado del agente.

## Qué hace
- Lee en solo lectura las casillas ventas@, ventas1@, ventas3@ y ventas5@, clasifica cada mail con IA y manda el "Resumen de ventas" diario a agustin@ a las 18:30 (L-V, sin feriados). Viernes: diario + semanal.
- Corre en Google Cloud (Cloud Scheduler + Cloud Run), no como tarea programada de Claude. Ver `SISTEMA.md`.

## Criterios de Agustín sobre ventas
- No exigir la comisión de la agencia en las cotizaciones: las agencias ya la conocen.
- Reenviar el PDF del operador con 1 o 2 líneas, sin resumen (total, salida, qué incluye), es mala práctica.
- "Las ventas se ganan como sea": "no encontré nada" sin alternativa concreta es un error grave. Si la agencia pide buscar en otro operador, hay que hacerlo.
- Detectar oportunidades abandonadas (el vendedor desiste sin precio ni alternativa).
- Por ahora, el pie estándar (tarifas sujetas a cambio + link a Condiciones Generales) alcanza para validez y cancelación.
- Liquidaciones, proformas y saldos no son cotizaciones.
- Horario hábil L-V 9:30-18:30 hora Argentina, sin feriados.
- Primera respuesta: menos de 30 minutos es bueno, menos de 1 hora es aceptable. Seguimiento de cotización: al día siguiente, a los 2 o 3 días y a la semana.
- Venta ganada: la agencia pide reservar, dice "avanzamos", manda seña o se pasa a Operaciones.
- 99% de las ventas son a agencias y por mail; los particulares escriben por WhatsApp.

## Decisiones que no se reabren
- No armar plan de acción sobre las hipótesis de Agustín hasta que lo pida.
- No hacer política escrita para los vendedores. No volver a proponerla.
- WhatsApp en pausa hasta el final del proyecto, por costo.
