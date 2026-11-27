const CONFIG = {
  REMITENTE: "ventas@davetur.com.ar",
  NOMBRE_REMITENTE: "Ventas | Davetur",
  EMAIL_PRUEBA: "agustin@vietur.com.ar",

  // COLUMNAS
  COLUMNA_VIAJE: 2,   // B = NOMBRE VIAJE
  COLUMNA_EMAIL: 6,   // F = EMAIL
  COLUMNA_ESTADO: 10  // J = ENVIADO
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("DAVETUR")
    .addItem("Enviar prueba", "enviarPrueba")
    .addSeparator()
    .addItem("Enviar mails", "enviarMails")
    .addToUi();
}

function validarCuenta() {
  var cuenta = Session.getEffectiveUser().getEmail();
  if (cuenta && cuenta.toLowerCase() !== CONFIG.REMITENTE.toLowerCase()) {
    SpreadsheetApp.getUi().alert(
      "El script se está ejecutando desde:\n\n" + cuenta +
      "\n\nDebe ejecutarse desde:\n\n" + CONFIG.REMITENTE
    );
    return false;
  }
  return true;
}

function escaparHtml(texto) {
  return String(texto || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function obtenerFirmaGmail() {
  var respuesta;
  try {
    respuesta = Gmail.Users.Settings.SendAs.list("me");
  } catch (error) {
    throw new Error(
      "No pude acceder a Gmail API.\n\n" +
      "Verificá que en Apps Script hayas hecho:\n" +
      "Servicios → + → Gmail API → Agregar.\n\n" +
      "Error original: " + error.toString()
    );
  }
  var cuentas = respuesta.sendAs || [];
  // Busca ventas@davetur.com.ar
  for (var i = 0; i < cuentas.length; i++) {
    if (cuentas[i].sendAsEmail &&
        cuentas[i].sendAsEmail.toLowerCase() === CONFIG.REMITENTE.toLowerCase()) {
      return cuentas[i].signature || "";
    }
  }
  // Si no la encuentra, intenta con la cuenta predeterminada
  for (var j = 0; j < cuentas.length; j++) {
    if (cuentas[j].isDefault) {
      return cuentas[j].signature || "";
    }
  }
  throw new Error("No encontré la firma configurada en Gmail para " + CONFIG.REMITENTE);
}

function crearMail(circuito, firmaHtml) {
  circuito = String(circuito || "").trim();
  var circuitoHtml = escaparHtml(circuito);
  var asunto = "Consulta sobre " + circuito;
  var cuerpoHtml =
    '<div style="' +
      'font-family:Arial,Helvetica,sans-serif;' +
      'font-size:14px;' +
      'line-height:1.5;' +
      'color:#202124;' +
    '">' +
      '<p style="margin:0 0 18px 0;">' + 'Hola, ¿cómo estás?' + '</p>' +
      '<p style="margin:0 0 18px 0;">' + 'Mi nombre es Pablo, del equipo de Davetur, agencia de viajes.' + '</p>' +
      '<p style="margin:0 0 18px 0;">' +
        'Nos ponemos en contacto porque vimos tu interés en el circuito de Europamundo ' +
        circuitoHtml +
        ' y queríamos ofrecerte nuestra ayuda para asesorarte y encontrar la opción que mejor se adapte a tu viaje.' +
      '</p>' +
      '<p style="margin:0 0 18px 0;">' +
        'Si querés, podés contarme para qué fecha tenés pensado viajar, cuántas personas serían o cualquier detalle que consideres importante, y con gusto voy a ayudarte con la propuesta.' +
      '</p>' +
      '<p style="margin:0 0 18px 0;">' + 'Quedo a disposición y aguardo tus comentarios.' + '</p>' +
      '<p style="margin:0 0 18px 0;">' + 'Saludos,' + '</p>' +
      '<div style="margin-top:18px;">' + firmaHtml + '</div>' +
    '</div>';
  return { asunto: asunto, cuerpoHtml: cuerpoHtml };
}

function codificarAsunto(asunto) {
  return "=?UTF-8?B?" + Utilities.base64Encode(asunto, Utilities.Charset.UTF_8) + "?=";
}

function enviarPorGmailApi(destinatario, asunto, cuerpoHtml) {
  var mensajeRaw =
    'From: "' + CONFIG.NOMBRE_REMITENTE + '" <' + CONFIG.REMITENTE + '>\r\n' +
    'Reply-To: ' + CONFIG.REMITENTE + '\r\n' +
    'To: ' + destinatario + '\r\n' +
    'Subject: ' + codificarAsunto(asunto) + '\r\n' +
    'MIME-Version: 1.0\r\n' +
    'Content-Type: text/html; charset=UTF-8\r\n' +
    'Content-Transfer-Encoding: 8bit\r\n' +
    '\r\n' +
    cuerpoHtml;
  var mensajeCodificado = Utilities
    .base64EncodeWebSafe(mensajeRaw, Utilities.Charset.UTF_8)
    .replace(/=+$/, "");
  Gmail.Users.Messages.send({ raw: mensajeCodificado }, "me");
}

function enviarPrueba() {
  var ui = SpreadsheetApp.getUi();
  if (!validarCuenta()) { return; }
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var fila = sheet.getActiveCell().getRow();
  // Si estás parado en el encabezado, busca la primera fila con circuito.
  if (fila < 2) {
    var ultimaFila = sheet.getLastRow();
    for (var i = 2; i <= ultimaFila; i++) {
      var viaje = sheet.getRange(i, CONFIG.COLUMNA_VIAJE).getDisplayValue().trim();
      if (viaje !== "") { fila = i; break; }
    }
  }
  var circuito = sheet.getRange(fila, CONFIG.COLUMNA_VIAJE).getDisplayValue().trim();
  if (!circuito) {
    ui.alert("No encontré ningún circuito en la columna B.\n\nSeleccioná una fila que tenga un viaje cargado.");
    return;
  }
  try {
    var firma = obtenerFirmaGmail();
    var mail = crearMail(circuito, firma);
    enviarPorGmailApi(CONFIG.EMAIL_PRUEBA, mail.asunto, mail.cuerpoHtml);
    ui.alert(
      "Prueba enviada correctamente.\n\n" +
      "Destino: " + CONFIG.EMAIL_PRUEBA + "\n\n" +
      "Circuito: " + circuito + "\n\n" +
      "Esta prueba NO marca la fila como ENVIADO."
    );
  } catch (error) {
    ui.alert("NO SE PUDO ENVIAR LA PRUEBA\n\n" + error.toString());
  }
}

function enviarMails() {
  var ui = SpreadsheetApp.getUi();
  if (!validarCuenta()) { return; }
  var lock = LockService.getDocumentLock();
  if (!lock.tryLock(5000)) {
    ui.alert("Ya hay un envío ejecutándose.\n\nEsperá unos segundos y volvé a intentar.");
    return;
  }
  try {
    var respuesta = ui.alert(
      "Confirmar envío",
      "¿Querés enviar todos los mails pendientes?\n\n" +
      "Se enviarán solamente las filas que tengan email " +
      "y que NO estén marcadas como ENVIADO en la columna J.",
      ui.ButtonSet.YES_NO
    );
    if (respuesta !== ui.Button.YES) { return; }
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var ultimaFila = sheet.getLastRow();
    if (ultimaFila < 2) { ui.alert("No hay filas para procesar."); return; }
    // Toma una sola vez la firma configurada en ventas@davetur.com.ar
    var firma = obtenerFirmaGmail();
    // Lee toda la tabla una sola vez.
    var datos = sheet.getRange(2, 1, ultimaFila - 1, CONFIG.COLUMNA_ESTADO).getDisplayValues();
    var enviados = 0;
    var omitidos = 0;
    var errores = 0;
    for (var i = 0; i < datos.length; i++) {
      var filaReal = i + 2;
      var circuito = String(datos[i][CONFIG.COLUMNA_VIAJE - 1] || "").trim();
      var email = String(datos[i][CONFIG.COLUMNA_EMAIL - 1] || "").trim();
      var estado = String(datos[i][CONFIG.COLUMNA_ESTADO - 1] || "").trim().toUpperCase();
      // Si ya dice ENVIADO, no toca esa fila.
      if (estado === "ENVIADO") { omitidos++; continue; }
      // Si falta email o circuito, tampoco intenta enviarlo.
      if (!email || !circuito) { omitidos++; continue; }
      try {
        var mail = crearMail(circuito, firma);
        enviarPorGmailApi(email, mail.asunto, mail.cuerpoHtml);
        // Solamente después del envío exitoso escribe ENVIADO.
        sheet.getRange(filaReal, CONFIG.COLUMNA_ESTADO).setValue("ENVIADO");
        SpreadsheetApp.flush();
        enviados++;
        Utilities.sleep(750);
      } catch (error) {
        errores++;
        var errorTexto = error.toString();
        Logger.log("Error fila " + filaReal + " - " + email + " - " + errorTexto);
        // Si Google devuelve un límite, corta inmediatamente.
        var errorMinuscula = errorTexto.toLowerCase();
        if (errorMinuscula.indexOf("limit") !== -1 ||
            errorMinuscula.indexOf("quota") !== -1 ||
            errorMinuscula.indexOf("too many") !== -1 ||
            errorMinuscula.indexOf("rate") !== -1) {
          ui.alert(
            "Google frenó el envío por un límite.\n\n" +
            "El sistema se detuvo automáticamente para no seguir generando errores.\n\n" +
            "Enviados en esta ejecución: " + enviados + "\n" +
            "Errores: " + errores + "\n\n" +
            "Desde la fila " + filaReal + " en adelante quedan pendientes."
          );
          return;
        }
      }
    }
    ui.alert(
      "Proceso terminado.\n\n" +
      "Enviados: " + enviados + "\n" +
      "Omitidos: " + omitidos + "\n" +
      "Errores: " + errores
    );
  } finally {
    lock.releaseLock();
  }
}

/* =========================================================
   ENVÍO AUTOMÁTICO SEMANAL (sin ventanas de confirmación)
   Agregado por el agente Presupuestos Europamundo el 27/11/2026.
   - Va al FINAL del script (no reemplaza nada).
   - Correr UNA sola vez "instalarEnvioAutomatico",
     logueado como ventas@davetur.com.ar.
   - Usa la misma firma, el mismo texto y el mismo remitente
     que el botón "Enviar mails".
   ========================================================= */

var AUTO = {
  HOJA: "Listado de Presupuestos (1)",
  MAX_POR_CORRIDA: 80,               // si hay más pendientes, no manda nada y avisa
  AVISO_A: "agustin@vietur.com.ar"   // recibe el resumen de cada corrida
};

/* Crea (o recrea) el disparador: jueves entre 11:00 y 11:30 aprox. */
function instalarEnvioAutomatico() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "enviarMailsAutomatico") {
      ScriptApp.deleteTrigger(t);
    }
  });
  ScriptApp.newTrigger("enviarMailsAutomatico")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.THURSDAY)
    .atHour(11)
    .nearMinute(15)
    .create();
}

function enviarMailsAutomatico() {
  var cuenta = Session.getEffectiveUser().getEmail();
  if (!cuenta || cuenta.toLowerCase() !== CONFIG.REMITENTE.toLowerCase()) {
    throw new Error(
      "El envío automático debe correr desde " + CONFIG.REMITENTE +
      " y está corriendo desde " + cuenta
    );
  }
  var lock = LockService.getDocumentLock();
  if (!lock.tryLock(60000)) {
    avisar_("Envío automático: no corrió", "Ya había otro envío ejecutándose.");
    return;
  }
  var enviados = 0;
  var errores = 0;
  var detalle = [];
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(AUTO.HOJA);
    var ultimaFila = sheet.getLastRow();
    var datos = ultimaFila < 2 ? [] :
      sheet.getRange(2, 1, ultimaFila - 1, CONFIG.COLUMNA_ESTADO).getDisplayValues();
    var pendientes = [];
    for (var i = 0; i < datos.length; i++) {
      var circuito = String(datos[i][CONFIG.COLUMNA_VIAJE - 1] || "").trim();
      var email = String(datos[i][CONFIG.COLUMNA_EMAIL - 1] || "").trim();
      var estado = String(datos[i][CONFIG.COLUMNA_ESTADO - 1] || "").trim().toUpperCase();
      if (estado === "ENVIADO" || !email || !circuito) {
        continue;
      }
      pendientes.push({ fila: i + 2, email: email, circuito: circuito });
    }
    if (pendientes.length === 0) {
      avisar_(
        "Envío automático: 0 pendientes",
        "No había filas pendientes. Revisá si la tanda de esta semana se cargó en el Sheet."
      );
      return;
    }
    if (pendientes.length > AUTO.MAX_POR_CORRIDA) {
      avisar_(
        "Envío automático: FRENADO (" + pendientes.length + " pendientes)",
        "Hay " + pendientes.length + " filas pendientes y el máximo es " +
        AUTO.MAX_POR_CORRIDA + ". No se mandó nada. Revisá el Sheet."
      );
      return;
    }
    var firma = obtenerFirmaGmail();
    for (var j = 0; j < pendientes.length; j++) {
      var p = pendientes[j];
      try {
        var mail = crearMail(p.circuito, firma);
        enviarPorGmailApi(p.email, mail.asunto, mail.cuerpoHtml);
        sheet.getRange(p.fila, CONFIG.COLUMNA_ESTADO).setValue("ENVIADO");
        SpreadsheetApp.flush();
        enviados++;
        Utilities.sleep(750);
      } catch (error) {
        errores++;
        var texto = error.toString();
        detalle.push("Fila " + p.fila + " - " + p.email + ": " + texto);
        if (/limit|quota|too many|rate/i.test(texto)) {
          detalle.push("Google frenó por límite. Quedan pendientes desde la fila " + p.fila + ".");
          break;
        }
      }
    }
    avisar_(
      "Envío automático: " + enviados + " enviados" + (errores ? ", " + errores + " con error" : ""),
      "Enviados: " + enviados + "\nErrores: " + errores +
      (detalle.length ? "\n\n" + detalle.join("\n") : "")
    );
  } finally {
    lock.releaseLock();
  }
}

function avisar_(asunto, texto) {
  try {
    enviarPorGmailApi(
      AUTO.AVISO_A,
      asunto,
      '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;white-space:pre-wrap;">' +
        escaparHtml(texto) +
      "</div>"
    );
  } catch (e) {
    Logger.log("No pude mandar el aviso: " + e);
  }
}
