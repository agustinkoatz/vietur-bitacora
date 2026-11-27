# Dominio · Reporte Ventas Europamundo

Carga mensual del reporte de ventas que Europamundo le manda a VIETUR en la solapa VENTA EUROPAMUNDO de la planilla Numbers. IDs en `SISTEMA.md`.

Última revisión: 27/11/2026 · ORQ, con el informe del agente.

## Proceso (solo a pedido, sin tarea programada)
1. En Gmail (agustin@vietur.com.ar), buscar "Reporte de Ventas VIETUR (ARGENTINA) del DD/MM/AAAA al DD/MM/AAAA". Lo manda comercial@europamundo.com a Alberto, Vanesa y Carmen Ramírez; Vanesa se lo reenvía a Agustín. Una versión por mes.
2. El reporte viene en el cuerpo del mail. Trae, por Serie (Asia / Oceanía, Clásica, Concursos, Global Market, KANNAK, Land Cruise, Más Incluído, México / Caribe, Oriente Medio / África, Turista, USA / Canadá, Carta de Viajes), plazas vendidas, canceladas y total neto, más pax viajados en el mes y una columna "Año Anterior".
3. Cargar en la solapa VENTA EUROPAMUNDO:
   - Cuadro EUROPAMUNDO 2026 (B2:O50): plazas netas por Serie, TOTAL PLAZAS (NETO), VENDIDAS, CANCELADAS; pax viajados por Serie y TOTAL PAX VIAJADOS; al final, COMPARACIÓN VS MISMO MES 2025.
   - Cuadro EUROPAMUNDO 2025 (B52:O81): misma estructura, sin comparación.
   - Comparación: por métrica, filas 2026 / 2025 / VAR. % pegadas (plazas netas, vendidas, canceladas, pax viajados, Clásica plazas netas y Clásica pax). ACUM. COMP. suma solo los meses que existen en los dos años.
   - Todo por fórmula (SUM, IF/SUMPRODUCT), separador ";" por el locale es_ES.
4. Verificar releyendo la solapa: los totales por Serie tienen que cerrar con el TOTAL del reporte.
- Datos cargados: ene-2025 a oct-2026. Feb-jul y nov 2025 salen del Excel "Europamundo_Vietur_2025.xlsx" que mandó Vanesa el 27/11.
- Europamundo manda el reporte del mes anterior entre el día 1 y el 5.

## Criterios de Agustín
- Solapa "VENTA EUROPAMUNDO", en mayúscula, después de PAX VIAJADOS POR DESTINO. Las demás solapas no se tocan.
- Mismo formato que las solapas PAX: Calibri 10, sin cuadrícula, columna B de 242 px, meses de 70 px con formato "mmm yyyy", columna TOTAL, bordes negros finos.
- Dos cuadros, uno por año, con plazas y pax juntos.
- Encabezado azul #C9DAF8 (2026), naranja #FCE5CD (2025), subencabezados gris #E7E6E6.
- Tonos: fila 2026 blanca; fila 2025 #F3F3F3 con texto gris; VAR. %, TOTAL PLAZAS (NETO) y TOTAL PAX VIAJADOS en #D9D9D9 y negrita; VENDIDAS y CANCELADAS #F3F3F3 con texto gris; línea gruesa entre bloques.
- Sin notas al pie.
- Plazas = total neto (vendidas menos canceladas). Números como números.
- Si un mes aparece con valores distintos, vale el cierre original, no la columna "Año Anterior" corregida después.
- Gmail solo lectura. Mails solo con OK de Agustín. A Vanesa: "Hola" a secas, meses uno debajo del otro, sin mencionar la planilla.

## Pendientes y riesgos
- Cargar noviembre 2026 (~1/12) y diciembre 2026 (principios de enero).
- Se le pidió a Vanesa (26/11) que Europamundo sume a Agustín al envío directo. Sin respuesta. Hoy los reportes dependen de que Vanesa los reenvíe.
- Europamundo corrige meses anteriores (diferencias de 1 a 7 plazas): se usa el cierre original.
- Si cambia el locale de la planilla, revisar las fórmulas.
- Sin tarea programada: la carga depende de que Agustín la pida.
