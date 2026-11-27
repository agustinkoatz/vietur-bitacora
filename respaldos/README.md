# Respaldos

Copias de código y configuración que hoy viven solo fuera de un repo. Sirven para reconstruir si se pierde el original. No son la versión que corre: si cambia el original, ORQ actualiza la copia.

## briefing/
- `briefing.py`: script del Briefing diario (Infobae + Ladevi). Corre en `/opt/briefing/briefing.py`.
- `setup_script.sh`: setup script completo del environment "Default" (`env_01Nsza3Uv6Gkb1kr1aumtVw4`) que instala ese script en cada contenedor.
- Copia tomada el 25/11/2026 (md5 `c0a6ac6055fcd798f087be5e5b5dbeb7`). Incluye Ladevi ampliado, tope de 8 notas en Infobae y lectura de 5-7 minutos.
- Para restaurar: pegar `setup_script.sh` como setup script del environment, con OK de Agustín.
- El respaldo viejo en Drive (`1QUbGAHiyQSjkrmbUbfKIb2XGQ21WNInA`, del 23/11) está desactualizado: usar este.

## davetur_apps_script/
- `Codigo.gs`: Apps Script del Sheet "Davetur_Listado_de_Presupuestos" (`15746MMuwXqj_K7YLjSuYiu2JFs-NjL67EfNEXdsp96Y`). Parte 1: script original de Agustín (menú DAVETUR, prueba, envío con botón). Parte 2: envío automático semanal agregado por el agente Presupuestos Europamundo el 27/11/2026.
- Requiere el servicio avanzado Gmail API (Servicios → Gmail API) y correr como ventas@davetur.com.ar.
- Para restaurar: pegar en el editor de Apps Script del Sheet y correr una vez `instalarEnvioAutomatico` logueado como ventas@davetur.com.ar (crea el activador de los jueves 11:00-11:30).
- Copia tomada el 27/11/2026. Sin claves ni tokens. Si cambia el script en el Sheet, ORQ actualiza esta copia.
