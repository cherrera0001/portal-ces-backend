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

const dinamicTextLines = (text, minCharsPerLine) => {
  const textWithExtraSpace = ' ' + text;
  const arrayText = [...textWithExtraSpace];
  let textInLines = [];
  let charSplitPosition = 0;
  arrayText.forEach((letter, index) => {
    if (index >= charSplitPosition && index >= charSplitPosition + minCharsPerLine && letter === ' ') {
      textInLines = [...textInLines, textWithExtraSpace.substring(charSplitPosition + 1, index)];
      charSplitPosition = index;
    } else if (index === textWithExtraSpace.length - 1) {
      textInLines = [...textInLines, textWithExtraSpace.substring(charSplitPosition + 1, index + 1)];
    }
  });
  return textInLines;
};

module.exports = async (args) => {
  const { protectedFamily, tireProtection, mechanicGuaranty, protecar, financialEntity, total, date, customer } =
    args || {};
  const pdfDoc = await PDFDocument.create();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaCursiveFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
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

  page.drawText('Informo a usted que con fecha', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 130,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('10-02-2021', {
    x: PAGE_BORDER + 122,
    y: PAGE_HEIGHT - 130,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('la solicitud de financiamiento Nro.', {
    x: PAGE_BORDER + 170,
    y: PAGE_HEIGHT - 130,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('10001726 - 002', {
    x: PAGE_BORDER + 305,
    y: PAGE_HEIGHT - 130,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('del (a) Sr.(a)', {
    x: PAGE_BORDER + 372,
    y: PAGE_HEIGHT - 130,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('HECTOR CUEVAS PEREZ', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 142,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  const nameWidth = helveticaBoldFont.widthOfTextAtSize('HECTOR CUEVAS PEREZ', FONT_SIZE);
  console.log(nameWidth);
  page.drawText(', cédula de Identidad', {
    x: PAGE_BORDER + nameWidth + 2,
    y: PAGE_HEIGHT - 142,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('15194183-4', {
    x: PAGE_BORDER + nameWidth + 88,
    y: PAGE_HEIGHT - 142,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('se encuentra aprobada por', {
    x: PAGE_BORDER + nameWidth + 142,
    y: PAGE_HEIGHT - 142,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  const secondLineWidth = nameWidth + 248;
  const secondLineRemainSpace = PAGE_CONTENT_WIDTH - secondLineWidth;
  const entityNameWidth = helveticaBoldFont.widthOfTextAtSize('Nombre de entidad', FONT_SIZE);

  page.drawText('Nombre de entidad' + '.', {
    x: secondLineRemainSpace > entityNameWidth ? PAGE_BORDER + nameWidth + 251 : PAGE_BORDER,
    y: secondLineRemainSpace > entityNameWidth ? PAGE_HEIGHT - 142 : PAGE_HEIGHT - 154,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('Las características del financiamiento son las siguientes:', {
    x: secondLineRemainSpace > entityNameWidth ? PAGE_BORDER : entityNameWidth + PAGE_BORDER + 5,
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

  page.drawText('Comercial Nuevo', {
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

  page.drawText('24', {
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

  page.drawText('1.63 %', {
    x: PAGE_BORDER + 195,
    y: financingDetailsTop - 40,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('Comisión Bruta Dealer', {
    x: PAGE_BORDER + 80,
    y: financingDetailsTop - 60,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('$353.718', {
    x: PAGE_BORDER + 195,
    y: financingDetailsTop - 60,
    size: FONT_SIZE,
    font: helveticaFont,
  });

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

  page.drawText('MAHINDRA', {
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

  page.drawText('PIK UP XL DC 4X2 CRDE', {
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

  page.drawText('2021', {
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

  page.drawText('$12.353.718', {
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

  page.drawText('$12.353.718', {
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

  page.drawText('$12.353.718', {
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

  page.drawText('USER AMICAR EXECUTIVE', {
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

  if (customer && customer.identificationValue) {
    page.drawText(String(customer.identificationValue), {
      x: PAGE_BORDER + 127,
      y: PAGE_HEIGHT - 603,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.address) {
    page.drawText(String(customer.address), {
      x: PAGE_BORDER + 46,
      y: PAGE_HEIGHT - 633,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.email) {
    page.drawText(String(customer.email), {
      x: PAGE_BORDER + 127,
      y: PAGE_HEIGHT - 663,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (date) {
    page.drawText(String(date), {
      x: PAGE_BORDER + 33,
      y: PAGE_HEIGHT - 693,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
};
