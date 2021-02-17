const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const axios = require('axios');
const { drawMultilineText, AMICAR_LOGO_URL } = require('eficar/helpers/pdf.helpers');

const FONT_SIZE = 9;
const LEGAL_FONT_SIZE = 7;
const TITLE_FONT_SIZE = 12;
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const PAGE_BORDER = 70;
const PAGE_CONTENT_WIDTH = PAGE_WIDTH - PAGE_BORDER * 2;

const moneyFormat = (value) => {
  const numParts = value.toString().split('.');
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return '$ ' + numParts.join('.');
};

const formatRut = (rut) => {
  if (!rut) return '';
  if (rut.length < 2) return rut;
  let cont = 0;
  let format;
  const rutFormat = rut.replace('.', '').replace('-', '');
  format = `-${rutFormat.substring(rutFormat.length - 1)}`;
  for (let i = rutFormat.length - 2; i >= 0; i -= 1) {
    format = rutFormat.substring(i, i + 1) + format;
    cont += 1;
    if (cont === 3 && i !== 0) {
      format = `.${format}`;
      cont = 0;
    }
  }
  return format;
};

module.exports = async (args) => {
  const {
    awardDate,
    loanId,
    customer,
    customerIdentificationValue,
    financialEntityName,
    loanTerm,
    customerRate,
    dealerCommission,
    balance,
    downPayment,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    vehicleYear,
    vehiclePrice,
    amicarExecutiveName,
  } = args || {};

  const pdfDoc = await PDFDocument.create();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const response = await axios.get(AMICAR_LOGO_URL, { responseType: 'arraybuffer' });
  const amicarLogo = await pdfDoc.embedPng(response.data);
  const logoDims = amicarLogo.scale(0.3);
  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

  page.drawImage(amicarLogo, {
    x: PAGE_WIDTH - PAGE_BORDER - 90,
    y: 790,
    width: logoDims.width,
    height: logoDims.height,
  });

  const title = 'CARTA DE APROBACIÓN DE CRÉDITO';
  const textWidth = helveticaBoldFont.widthOfTextAtSize(title, TITLE_FONT_SIZE);
  const textX = PAGE_WIDTH / 2 - textWidth / 2;

  page.drawText(title, {
    x: textX,
    y: 770,
    size: TITLE_FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawLine({
    start: {
      x: textX,
      y: 768,
    },
    end: {
      x: textX + textWidth + 5,
      y: 768,
    },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  page.drawText('Señores:', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 100,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('Informo a usted que con fecha', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 130,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText(awardDate, {
    x: PAGE_BORDER + 125,
    y: PAGE_HEIGHT - 130,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('la solicitud de financiamiento Nro.', {
    x: PAGE_BORDER + 174,
    y: PAGE_HEIGHT - 130,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  const loanIdTextWidth = helveticaBoldFont.widthOfTextAtSize(`${loanId}`, FONT_SIZE);

  page.drawText(`${loanId}`, {
    x: PAGE_BORDER + 310,
    y: PAGE_HEIGHT - 130,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('del (a) Sr.(a)', {
    x: PAGE_BORDER + loanIdTextWidth + 313,
    y: PAGE_HEIGHT - 130,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText(customer.toUpperCase(), {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 142,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  const nameWidth = helveticaBoldFont.widthOfTextAtSize(customer.toUpperCase(), FONT_SIZE);
  console.log(nameWidth);
  page.drawText(', cédula de Identidad', {
    x: PAGE_BORDER + nameWidth + 2,
    y: PAGE_HEIGHT - 142,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText(formatRut(customerIdentificationValue), {
    x: PAGE_BORDER + nameWidth + 88,
    y: PAGE_HEIGHT - 142,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('se encuentra aprobada por', {
    x: PAGE_BORDER + nameWidth + 144,
    y: PAGE_HEIGHT - 142,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  const secondLineWidth = nameWidth + 252;
  const secondLineRemainSpace = PAGE_CONTENT_WIDTH - secondLineWidth;
  const entityNameWidth = helveticaBoldFont.widthOfTextAtSize(financialEntityName, FONT_SIZE);

  page.drawText(financialEntityName + '.', {
    x: secondLineRemainSpace > entityNameWidth ? PAGE_BORDER + nameWidth + 255 : PAGE_BORDER,
    y: secondLineRemainSpace > entityNameWidth ? PAGE_HEIGHT - 142 : PAGE_HEIGHT - 154,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('Las características del financiamiento son las siguientes:', {
    x: secondLineRemainSpace > entityNameWidth ? PAGE_BORDER : entityNameWidth + PAGE_BORDER + 8,
    y: PAGE_HEIGHT - 154,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // --------------------------

  const financingDetailsTop = PAGE_HEIGHT - 190;

  page.drawText('Tipo de vehículo', {
    x: PAGE_BORDER + 80,
    y: financingDetailsTop,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText(vehicleType, {
    x: PAGE_BORDER + 195,
    y: financingDetailsTop,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('Cantidad de cuotas', {
    x: PAGE_BORDER + 80,
    y: financingDetailsTop - 20,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText(`${loanTerm}`, {
    x: PAGE_BORDER + 195,
    y: financingDetailsTop - 20,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('Tasa de interés', {
    x: PAGE_BORDER + 80,
    y: financingDetailsTop - 40,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText(`${customerRate} %`, {
    x: PAGE_BORDER + 195,
    y: financingDetailsTop - 40,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  if (!!dealerCommission) {
    page.drawText('Comisión Bruta Dealer', {
      x: PAGE_BORDER + 80,
      y: financingDetailsTop - 60,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaBoldFont,
    });

    page.drawText(moneyFormat(dealerCommission), {
      x: PAGE_BORDER + 195,
      y: financingDetailsTop - 60,
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  //----------------------------------

  page.drawText('Correspondientes a la compra del vehículo:', {
    x: PAGE_BORDER,
    y: financingDetailsTop - 100,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  const vehicleDetailsTop = financingDetailsTop - 140;

  page.drawText('Marca', {
    x: PAGE_BORDER + 80,
    y: vehicleDetailsTop,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText(vehicleBrand, {
    x: PAGE_BORDER + 195,
    y: vehicleDetailsTop,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('Modelo', {
    x: PAGE_BORDER + 80,
    y: vehicleDetailsTop - 20,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText(vehicleModel, {
    x: PAGE_BORDER + 195,
    y: vehicleDetailsTop - 20,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('Año', {
    x: PAGE_BORDER + 80,
    y: vehicleDetailsTop - 40,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText(`${vehicleYear}`, {
    x: PAGE_BORDER + 195,
    y: vehicleDetailsTop - 40,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('Valor', {
    x: PAGE_BORDER + 80,
    y: vehicleDetailsTop - 60,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText(`${moneyFormat(vehiclePrice)}`, {
    x: PAGE_BORDER + 195,
    y: vehicleDetailsTop - 60,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('Pie', {
    x: PAGE_BORDER + 80,
    y: vehicleDetailsTop - 80,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText(`${moneyFormat(downPayment)}`, {
    x: PAGE_BORDER + 195,
    y: vehicleDetailsTop - 80,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('Saldo Precio', {
    x: PAGE_BORDER + 80,
    y: vehicleDetailsTop - 100,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText(`${moneyFormat(balance)}`, {
    x: PAGE_BORDER + 195,
    y: vehicleDetailsTop - 100,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  //----------------------------------

  const subtitleWidth = helveticaBoldFont.widthOfTextAtSize('Condiciones particulares:', LEGAL_FONT_SIZE);
  page.drawText('Condiciones particulares:', {
    x: PAGE_WIDTH / 2 - subtitleWidth / 2,
    y: PAGE_HEIGHT - 480,
    size: LEGAL_FONT_SIZE,
    width: subtitleWidth,
    font: helveticaBoldFont,
  });

  drawMultilineText({
    page,
    lines: [
      '1. Amicar no responderá por el pago del Saldo de Precio si dentro de los 15 días siguientes a la fecha de emisión de la Carta de Aprobación',
      'Amicar la Entidad Financiera no ha recibido conforme la documentación del vehículo (Factura, Solicitud de Primera Inscripción, Nota de Venta y',
      'Formulario 88 SII).',
      '',
      '2. El envío y recepción de la documentación del vehículo indicada en punto anterior deberá efectuarse en un plazo máximo de 5 días desde',
      'fecha de solicitud de primera inscripción y no debe encontrarse rechazada por el Registro Nacional de Vehículos Motorizados, en caso contrario',
      'el saldo precio se pagará contra la constitución efectiva de la prenda del vehículo. Vencido este plazo, Amicar no asumirá responsabilidad',
      'alguna por el saldo de precio de la operación, no pudiendo el Dealer hacer reclamo alguno en este sentido a Amicar.',
      '',
      '3. El pago de Saldo de precio será efectuado por la Entidad Financiera en un tiempo estimado de 48 horas hábiles una vez enviada y recibida',
      'la documentación del vehículo señalada anteriormente',
      '',
      '4. La recepción de esta carta de aprobación compromete al Dealer a concretar la venta del vehículo con financiamiento. En caso de anulación',
      'del crédito por causa asociada a la venta o disponibilidad del vehículo, la documentación que dé cuenta de tal anulación deberá ser firmada',
      'expresamente por el cliente, junto con el pago de los costos de anulación si los hubiere. De no cumplirse con lo anterior, por cualquier causa,',
      'el Dealer faculta desde ya a Amicar para descontar dichos costos de la cartola mensual de comisiones.',
      '',
      '5. Amicar no se hace responsable bajo ninguna circunstancia por la entrega del vehículo sin la correspondiente Carta de Aprobación Amicar.',
      '',
      '6. Se deja expresa constancia que Amicar sólo es responsable por hechos u actos imputables a su responsabilidad o la de su personal, en',
      'ningún caso a actuaciones de terceros.',
    ],
    font: helveticaFont,
    fontSize: LEGAL_FONT_SIZE,
    lineHeight: 8,
    alignment: 'left',
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 500,
  });

  // -----------------------

  page.drawRectangle({
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 700,
    width: PAGE_WIDTH - PAGE_BORDER * 2,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawText(
    'Declaro conocer y aceptar las condiciones de financiamiento y comisión correspondientes a la solicitud mencionada en la presente carta.',
    {
      x: PAGE_BORDER + 5,
      y: PAGE_HEIGHT - 694,
      color: rgb(0, 0, 0, 0),
      size: LEGAL_FONT_SIZE,
      font: helveticaFont,
    },
  );

  page.drawText('Nombre y Firma Representante CES', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 745,
    color: rgb(0, 0, 0, 0),
    size: LEGAL_FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('Fecha Recepción Carta', {
    x: PAGE_BORDER + 200,
    y: PAGE_HEIGHT - 745,
    color: rgb(0, 0, 0, 0),
    size: LEGAL_FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText(amicarExecutiveName.toUpperCase(), {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 790,
    color: rgb(0, 0, 0, 0),
    size: LEGAL_FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('Firma y Timbre Ejecutivo de Negocios AMICAR.', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 800,
    color: rgb(0, 0, 0, 0),
    size: LEGAL_FONT_SIZE,
    font: helveticaFont,
  });

  if (customer && customer.name) {
    page.drawText(String(customer.name), {
      x: PAGE_BORDER + 41,
      y: PAGE_HEIGHT - 573,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  return pdfDoc.saveAsBase64();
};
