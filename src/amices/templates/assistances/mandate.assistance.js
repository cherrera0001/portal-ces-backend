const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const axios = require('axios');
const { drawMultilineText, AMICAR_LOGO_URL } = require('amices/helpers/pdf.helpers');

const FONT_SIZE = 9;
const TITLE_FONT_SIZE = 12;
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const PAGE_BORDER = 90;

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

  const title = 'MANDATO SEGUROS Y SERVICIOS';
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

  page.drawText('Por el presente instrumento, confiero mandato a', {
    x: PAGE_BORDER,
    y: 740,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawLine({
    start: {
      x: PAGE_BORDER + 195,
      y: 739,
    },
    end: {
      x: PAGE_BORDER + 350,
      y: 739,
    },
    thickness: 0.5,
    color: rgb(0, 0, 0),
  });

  page.drawText('(Nombre EF),', {
    x: PAGE_BORDER + 352,
    y: 740,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('en adelante la', {
    x: PAGE_BORDER + 410,
    y: 740,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  drawMultilineText({
    page,
    lines: [
      '"Entidad Financiera", para que incluya en el crédito automotriz suscrito el monto TOTAL destinado a financiar el o',
      'los productos de Servicios que se detallan a continuación:',
    ],
    font: helveticaFont,
    fontSize: FONT_SIZE,
    lineHeight: 12,
    alignment: 'left',
    x: PAGE_BORDER,
    y: 728,
  });

  // --------------------------
  const containerWidth = 210;

  page.drawRectangle({
    x: PAGE_BORDER + 50,
    y: PAGE_HEIGHT - 175,
    width: containerWidth,
    height: 25,
    borderWidth: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });

  page.drawRectangle({
    x: PAGE_BORDER + 260,
    y: PAGE_HEIGHT - 175,
    width: 130,
    height: 25,
    borderWidth: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });

  page.drawRectangle({
    x: PAGE_BORDER + 75,
    y: PAGE_HEIGHT - 195,
    width: containerWidth,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER + 260,
    y: PAGE_HEIGHT - 195,
    width: 130,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER + 75,
    y: PAGE_HEIGHT - 215,
    width: containerWidth,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER + 260,
    y: PAGE_HEIGHT - 215,
    width: 130,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER + 75,
    y: PAGE_HEIGHT - 235,
    width: containerWidth,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER + 260,
    y: PAGE_HEIGHT - 235,
    width: 130,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER + 75,
    y: PAGE_HEIGHT - 255,
    width: containerWidth,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER + 260,
    y: PAGE_HEIGHT - 255,
    width: 130,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER + 260,
    y: PAGE_HEIGHT - 275,
    width: 130,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER + 210,
    y: PAGE_HEIGHT - 275,
    width: 50,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER + 50,
    y: PAGE_HEIGHT - 195,
    width: 25,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER + 50,
    y: PAGE_HEIGHT - 215,
    width: 25,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER + 50,
    y: PAGE_HEIGHT - 235,
    width: 25,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER + 50,
    y: PAGE_HEIGHT - 255,
    width: 25,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawText('SERVICIOS', {
    x: PAGE_BORDER + 130,
    y: PAGE_HEIGHT - 166,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('MONTO A FINANCIAR', {
    x: PAGE_BORDER + 280,
    y: PAGE_HEIGHT - 166,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('Familia Protegida', {
    x: PAGE_BORDER + 80,
    y: PAGE_HEIGHT - 188,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  if (financialEntity) {
    page.drawText(financialEntity, {
      x: PAGE_BORDER + 195,
      y: 741,
      size: FONT_SIZE,
      font: helveticaBoldFont,
    });
  }

  if (protectedFamily) {
    page.drawText('X', {
      x: PAGE_BORDER + 58,
      y: PAGE_HEIGHT - 190,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE + 4,
      font: helveticaFont,
    });

    page.drawText(String(protectedFamily), {
      x: PAGE_BORDER + 272,
      y: PAGE_HEIGHT - 188,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  page.drawText('Protección de Neumáticos', {
    x: PAGE_BORDER + 80,
    y: PAGE_HEIGHT - 208,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  if (tireProtection) {
    page.drawText('X', {
      x: PAGE_BORDER + 58,
      y: PAGE_HEIGHT - 210,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE + 4,
      font: helveticaFont,
    });

    page.drawText(String(tireProtection), {
      x: PAGE_BORDER + 272,
      y: PAGE_HEIGHT - 208,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  page.drawText('Garantía Mecánica Vehículos Usados', {
    x: PAGE_BORDER + 80,
    y: PAGE_HEIGHT - 228,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  if (mechanicGuaranty) {
    page.drawText('X', {
      x: PAGE_BORDER + 58,
      y: PAGE_HEIGHT - 230,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE + 4,
      font: helveticaFont,
    });

    page.drawText(String(mechanicGuaranty), {
      x: PAGE_BORDER + 272,
      y: PAGE_HEIGHT - 228,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (protecar) {
    page.drawText('X', {
      x: PAGE_BORDER + 58,
      y: PAGE_HEIGHT - 250,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE + 4,
      font: helveticaFont,
    });

    page.drawText(String(protecar), {
      x: PAGE_BORDER + 272,
      y: PAGE_HEIGHT - 248,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (total) {
    page.drawText(String(total), {
      x: PAGE_BORDER + 272,
      y: PAGE_HEIGHT - 268,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  page.drawText('Robo Contenido y Reparaciones menores', {
    x: PAGE_BORDER + 80,
    y: PAGE_HEIGHT - 248,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('TOTAL', {
    x: PAGE_BORDER + 215,
    y: PAGE_HEIGHT - 268,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('$', {
    x: PAGE_BORDER + 265,
    y: PAGE_HEIGHT - 188,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('$', {
    x: PAGE_BORDER + 265,
    y: PAGE_HEIGHT - 208,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('$', {
    x: PAGE_BORDER + 265,
    y: PAGE_HEIGHT - 228,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('$', {
    x: PAGE_BORDER + 265,
    y: PAGE_HEIGHT - 248,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('$', {
    x: PAGE_BORDER + 265,
    y: PAGE_HEIGHT - 268,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  //----------------------------------

  drawMultilineText({
    page,
    lines: [
      'Marcar con una X en la casilla los productos de Servicios que se desean financiar y detallar el monto a financiar por producto',
      'más la suma total de todos estos montos.',
    ],
    font: helveticaCursiveFont,
    fontSize: 8,
    lineHeight: 12,
    alignment: 'left',
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 290,
  });

  drawMultilineText({
    page,
    lines: [
      'Asimismo autorizo y confiero mandato para que dicho monto sea entregado a y/o retenido por',
      'SOCIEDAD DE CRÉDITOS AUTOMOTRICES S.A., en adelante "AMICAR S.A.", para que ésta pague a',
      'Sur Asistencia S.A., con cargo a dicha suma, los montos que correspondan por concepto de los Servicios',
      'que haya contratado por el vehículo financiado.',
      '',
      'Dejo expresa constancia que la Entidad Financiera y AMICAR S.A. no tienen obligación ni',
      'responsabilidad alguna respecto del otorgamiento de los Servicios ofrecidos, los cuales son prestados por',
      'Sur Asistencia S.A. La Entidad Financiera y/o AMICAR S.A., según sea el caso, rendiran cuenta de su',
      'gestión al mandante, al correo electrónico definido por éste en el presente instrumento, conforme a lo',
      'establecido en la normativa vigente.',
      '',
      'Asimismo, en caso que el crédito automotriz suscrito sea terminado, por cualquier motivo, antes de',
      'finalizar el plazo pactado de crédito, la Entidad Financiera y AMICAR S.A. no tendrán la obligación de',
      'realizar devolución alguna, toda vez que el servicio es prestado por una tercera entidad, la cual es quien',
      'recibe el pago correspondiente y por tanto es la obligada a la devolución.',
      '',
      'El presente mandato podrá ser revocado y la revocación podrá efectuarse una vez que estén totalmente',
      'extinguidas las obligaciones del mandante con el proveedor de los Servicios, y producirá efectos a contar',
      'del décimo quinto día de su notificación al mandantario al correo electrónico:',
      'serviciosdeasistencia@amicar.cl',
    ],
    font: helveticaFont,
    fontSize: FONT_SIZE,
    lineHeight: 12,
    alignment: 'left',
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 320,
  });

  // -----------------------

  page.drawRectangle({
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 580,
    width: PAGE_WIDTH - PAGE_BORDER * 2,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 610,
    width: PAGE_WIDTH - PAGE_BORDER * 2,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 640,
    width: PAGE_WIDTH - PAGE_BORDER * 2,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 670,
    width: PAGE_WIDTH - PAGE_BORDER * 2,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 700,
    width: PAGE_WIDTH - PAGE_BORDER * 2,
    height: 20,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawText('Nombre:', {
    x: PAGE_BORDER + 5,
    y: PAGE_HEIGHT - 573,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('Cédula Nacional de Identidad:', {
    x: PAGE_BORDER + 5,
    y: PAGE_HEIGHT - 603,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('Domicilio:', {
    x: PAGE_BORDER + 5,
    y: PAGE_HEIGHT - 633,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('Correo Electrónico Mandante:', {
    x: PAGE_BORDER + 5,
    y: PAGE_HEIGHT - 663,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawText('Fecha:', {
    x: PAGE_BORDER + 5,
    y: PAGE_HEIGHT - 693,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page.drawRectangle({
    x: 217.64,
    y: PAGE_HEIGHT - 800,
    width: 160,
    height: 80,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page.drawLine({
    start: {
      x: 237.64,
      y: PAGE_HEIGHT - 760,
    },
    end: {
      x: 357.64,
      y: PAGE_HEIGHT - 760,
    },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  page.drawText('Firma', {
    x: 285,
    y: PAGE_HEIGHT - 780,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  if (customer && customer.name) {
    page.drawText(String(customer.name), {
      x: PAGE_BORDER + 40,
      y: PAGE_HEIGHT - 573,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.identificationValue) {
    page.drawText(String(customer.identificationValue), {
      x: PAGE_BORDER + 125,
      y: PAGE_HEIGHT - 603,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.address) {
    page.drawText(String(customer.address), {
      x: PAGE_BORDER + 45,
      y: PAGE_HEIGHT - 633,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.email) {
    page.drawText(String(customer.email), {
      x: PAGE_BORDER + 125,
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
