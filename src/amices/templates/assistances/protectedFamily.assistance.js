const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const {
  addSeparatorRectangle,
  addSingleCell,
  addUnderlineText,
  drawMultilineText,
  drawSignatureLine,
  generatePages,
} = require('amices/helpers/pdf.helpers');

const FONT_SIZE = 8;
const TITLE_FONT_SIZE = 15;
const SUB_TITLE_FONT_SIZE = 12;
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const PAGE_BORDER = 35;
const CELL_WIDTH = 125;

module.exports = async (args) => {
  const { contract, customer } = args || {};
  const pdfDoc = await PDFDocument.create();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = await generatePages({ pdfDoc, amount: 6, helveticaFont, helveticaBoldFont, shouldDrawFooter: false });
  const headerCellSpace = (PAGE_WIDTH - PAGE_BORDER * 2 - 3 * CELL_WIDTH) / 2;
  const clientDataWidth = (PAGE_WIDTH - 2 * PAGE_BORDER) / 3;
  const [page, page2, page3, page4, page5, page6] = pages;

  page.drawText('CERTIFICADO DE SERVICIO ASISTENCIA', {
    x: 140,
    y: 750,
    size: TITLE_FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('FAMILIA PROTEGIDA', {
    x: 220,
    y: 730,
    size: TITLE_FONT_SIZE,
    font: helveticaBoldFont,
  });

  addSingleCell({
    page,
    text: 'FECHA CONTRATACIÓN',
    font: helveticaBoldFont,
    x: PAGE_BORDER,
    y: 680,
  });

  addSingleCell({
    page,
    text: 'Nº DE CONTRATO',
    font: helveticaBoldFont,
    titleColor: rgb(0.85, 0.85, 0.85),
    x: PAGE_BORDER + (CELL_WIDTH + headerCellSpace),
    y: 680,
  });

  addSingleCell({
    page,
    text: 'FECHA DE TÉRMINO',
    font: helveticaBoldFont,
    x: PAGE_BORDER + 2 * (CELL_WIDTH + headerCellSpace),
    y: 680,
  });

  addSeparatorRectangle({
    page,
    text: 'ANTECEDENTES DEL CONTRATANTE',
    font: helveticaFont,
    color: rgb(1, 1, 1),
    backgroundColor: rgb(0.752, 0, 0),
    y: 630,
  });

  addSingleCell({
    page,
    text: 'NOMBRE',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: PAGE_WIDTH - 2 * PAGE_BORDER,
    textX: PAGE_BORDER + 5,
    x: PAGE_BORDER,
    y: 595,
    alignment: 'start',
  });

  addSingleCell({
    page,
    text: 'RUT',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: clientDataWidth,
    x: PAGE_BORDER,
    y: 561,
  });

  addSingleCell({
    page,
    text: 'DIRECCIÓN',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: PAGE_WIDTH - 2 * PAGE_BORDER,
    textX: PAGE_BORDER + 5,
    x: PAGE_BORDER,
    y: 527,
    alignment: 'start',
  });

  page.drawText('(Calle, Número, Departamento/Block, Comuna)', {
    x: PAGE_BORDER + 54,
    y: 532,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  addSingleCell({
    page,
    text: 'CIUDAD',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: clientDataWidth,
    x: PAGE_BORDER,
    y: 493,
  });

  addSingleCell({
    page,
    text: 'TELÉFONO',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: clientDataWidth,
    x: PAGE_BORDER + clientDataWidth,
    y: 493,
  });

  addSingleCell({
    page,
    text: 'CELULAR',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: clientDataWidth,
    x: PAGE_BORDER + 2 * clientDataWidth,
    y: 493,
  });

  addSeparatorRectangle({
    page,
    text: 'ACEPTACIÓN DE CONDICIONES',
    font: helveticaFont,
    color: rgb(1, 1, 1),
    backgroundColor: rgb(0.752, 0, 0),
    y: 445,
  });

  drawMultilineText({
    page,
    lines: [
      '1.  Los servicios de asistencia descritos en la siguiente solicitud serán prestados por Sur Asistencia S.A. a través de su marca comercial',
      '     MAPFRE ASSISTANCE y su red de proveedores.',
      '',
      '2.  La contratación del servicio de asistencia es voluntario y el Cliente ha libremente consentido en su contratación.',
      '',
      '3.  El Cliente autoriza el tratamiento de datos personales contenidos en este formulario de acuerdo a lo dispuesto en el art. 4 de la ley 19.628 con la',
      '     finalidad de: (a) mantener un registro de sus clientes y de su relación comercial en general, al tenor de lo dispuesto en la Ley No19.628;',
      '     (b) comprobar la veracidad o falsedad de estos datos, en virtud de la misma norma legal; (c) compartir con terceros con quienes celebre',
      '     acuerdos comerciales, datos personales del Cliente para la correcta entrega de los servicios contratados u otros beneficios; (d) enviar',
      '     información sobre anuncios comerciales, promociones y ofertas de bienes y servicios. El Cliente, de conformidad con las normas legales,',
      '     siempre podrá solicitar la suspensión temporal o la revocación de su aceptación de recibir dichos anuncios comerciales, ofertas o promociones.',
      '',
      '4.  Conforme a lo instruido por el Cliente, la tarifa correspondiente al servicio de asistencia será recaudada del crédito automotriz contratado',
      '     y pagada por Sociedad de Créditos Automotrices S.A a Sur Asistencia S.A..',
      '',
      '5.  La presente solicitud sólo entrará en vigencia una vez suscrita por el Cliente, habiendo Sur Asistencia S.A. recibido los antecedentes',
      '     correspondientes y habiéndose pagado la tarifa en la forma indicada en el numeral anterior.',
      '',
      '6.  Sur Asistencia S.A. en su calidad de otorgante del servicio de asistencia, asume las responsabilidades que emanan de su actuación',
      '     como contratante del servicio colectivo, entre las cuales está informar a los clientes u otros legítimos interesados sobre la contratación del',
      '     servicio y su entrada en vigencia.',
      '',
      '7.  El Cliente autoriza a Sur Asistencia S.A. a guardar la boleta por el costo del servicio, con la obligación de tenerla a disposición del Cliente',
      '     para su retiro por el plazo máximo de seis meses contados desde su emisión, transcurrido el cual cesará su obligación.',
      '',
      '8.  El presente documento establece el detalle de los términos y condiciones del servicio de asistencia, situaciones que no',
      '     forman parte del servicio y ámbito territorial del servicio de asistencia, las cuales se entenderán aceptadas con la sola firma',
      '     del cliente.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: 420,
  });

  drawSignatureLine({
    page,
    start: { x: 200, y: 75 },
    end: { x: 400, y: 75 },
    text: 'Firma Cliente Contratante',
    font: helveticaFont,
    x: 250,
    y: 60,
  });

  if (contract && contract.startDate) {
    page.drawText(String(contract.startDate), {
      x: PAGE_BORDER + 3,
      y: 669,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (contract && contract.contractNumber) {
    page.drawText(String(contract.contractNumber), {
      x: PAGE_BORDER + (CELL_WIDTH + headerCellSpace) + 3,
      y: 669,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (contract && contract.endDate) {
    page.drawText(String(contract.endDate), {
      x: PAGE_BORDER + 2 * (CELL_WIDTH + headerCellSpace) + 3,
      y: 669,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.name) {
    page.drawText(String(customer.name), {
      x: PAGE_BORDER + 3,
      y: 584,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.identificationValue) {
    page.drawText(String(customer.identificationValue), {
      x: PAGE_BORDER + 3,
      y: 550,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.address) {
    page.drawText(String(customer.address), {
      x: PAGE_BORDER + 3,
      y: 516,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.city) {
    page.drawText(String(customer.city), {
      x: PAGE_BORDER + 3,
      y: 482,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.phone) {
    page.drawText(String(customer.phone), {
      x: PAGE_BORDER + clientDataWidth + 3,
      y: 482,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.cellPhone) {
    page.drawText(String(customer.cellPhone), {
      x: PAGE_BORDER + 2 * clientDataWidth + 3,
      y: 482,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  // -------------------------- Page 2 --------------------------

  page2.drawText('CONDICIONES PARTICULARES SERVICIO ASISTENCIA PERSONAS AMICAR', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 90,
    size: SUB_TITLE_FONT_SIZE,
    font: helveticaBoldFont,
    color: rgb(1, 0.0039, 0),
  });

  page2.drawText('Cliente titular:', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 110,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page2.drawText(
    'Persona que contrate Servicio Asistencia Personas Amicar, el cual incluye servicios de asistencia prestados por Sur Asistencia.',
    {
      x: PAGE_BORDER + 55,
      y: PAGE_HEIGHT - 110,
      size: FONT_SIZE,
      font: helveticaFont,
    },
  );

  page2.drawText('Beneficiarios:', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 130,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page2.drawText(
    'Personas designadas por el cliente titular Amicar, correspondiente a quienes tienen acceso al uso de los servicios detallados en',
    {
      x: PAGE_BORDER + 55,
      y: PAGE_HEIGHT - 130,
      size: FONT_SIZE,
      font: helveticaFont,
    },
  );

  page2.drawText('estas condiciones y los cuales son prestados por Sur Asistencia.', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 140,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'Cuando en el detalle de los servicios de asistencia se mencione la expresión "Cliente", se entenderá que se hace referencia a todas',
      'o a cualquiera de las personas descritas.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 160,
  });

  page2.drawText('Dolencia y/o afección:', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 190,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page2.drawText(
    'Los términos "dolencia" y/o "afección" se entenderán como sinónimos de "enfermedad" a todos los efectos en',
    {
      x: PAGE_BORDER + 86,
      y: PAGE_HEIGHT - 190,
      size: FONT_SIZE,
      font: helveticaFont,
    },
  );

  page2.drawText('estas condiciones.', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 200,
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page2.drawText('Accidente:', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 220,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page2.drawText(
    'El evento generativo de un daño corporal que sufre el Cliente, causado por agentes extraños, fuera de control y en movimientos ',
    {
      x: PAGE_BORDER + 43,
      y: PAGE_HEIGHT - 220,
      size: FONT_SIZE,
      font: helveticaFont,
    },
  );

  drawMultilineText({
    page: page2,
    lines: [
      'externos, violentos y visibles. Siempre que se mencione el término "accidente" se entenderá que la lesión o dolencia resultante fue provocada',
      'directamente por tales agentes e independientemente de cualquier otra causa.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 230,
  });

  page2.drawText('Ámbito Territorial:', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 260,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page2.drawText(
    'Corresponde a la zona geográfica mediante la cual Sur Asistencia S.A. limita la prestación de sus servicios de asistencia.',
    {
      x: PAGE_BORDER + 72,
      y: PAGE_HEIGHT - 260,
      size: FONT_SIZE,
      font: helveticaFont,
    },
  );

  page2.drawText('Capitales regionales:', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 280,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page2.drawText(
    ' Se entiende por capitales regionales a las siguientes ciudades de Chile: Arica, Iquique, Antofagasta, Copiapó, ',
    {
      x: PAGE_BORDER + 80,
      y: PAGE_HEIGHT - 280,
      size: FONT_SIZE,
      font: helveticaFont,
    },
  );

  page2.drawText(
    'La Serena, Valparaíso, Rancagua, Talca, Concepción, Temuco, Valdivia, Puerto Montt, Coyhaique, Punta Arenas, Santiago.',
    {
      x: PAGE_BORDER,
      y: PAGE_HEIGHT - 290,
      size: FONT_SIZE,
      font: helveticaFont,
    },
  );

  page2.drawText('Radio Urbano:', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 310,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page2.drawText(
    'Comprende las principales ciudades del país propiamente tales -capitales regionales-, definidas por sus límites',
    {
      x: PAGE_BORDER + 57,
      y: PAGE_HEIGHT - 310,
      size: FONT_SIZE,
      font: helveticaFont,
    },
  );

  page2.drawText(
    'urbanos y máximo 20 Km. alrededor contados desde sus límites, siempre que sus rutas de acceso lo permitan (camino transitable por un automóvil).',
    {
      x: PAGE_BORDER,
      y: PAGE_HEIGHT - 320,
      size: FONT_SIZE,
      font: helveticaFont,
    },
  );

  page2.drawText('Vigencia', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 340,
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'La vigencia de este servicio dependerá de los meses de Asistencia contratados por el Cliente, pudiendo contratar un mínimo de 12 meses',
      'y un máximo de 48 meses.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 360,
  });

  // -------------------------- Page 3 --------------------------

  page3.drawText('RESUMEN DE LOS SERVICIOS', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 90,
    size: SUB_TITLE_FONT_SIZE - 1,
    font: helveticaBoldFont,
  });

  page3.drawText('SERVICIO ASISTENCIA PERSONAS AMICAR', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 110,
    size: SUB_TITLE_FONT_SIZE,
    font: helveticaBoldFont,
    color: rgb(1, 0.0039, 0),
  });

  drawMultilineText({
    page: page3,
    lines: [
      'Los servicios de Asistencia indicados a continuación son aquellos que serán coordinados y proporcionados por Sur Asistencia a través',
      'de su red de prestadores. Cualquier otro tipo de atención no expresada en este certificado, no será otorgado como servicio de asistencia.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 130,
  });

  const containerWidth = 200;

  page3.drawRectangle({
    x: PAGE_BORDER + 64,
    y: PAGE_HEIGHT - 210,
    width: containerWidth,
    height: 50,
    borderWidth: 0.5,
    color: rgb(0.752, 0, 0),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 264,
    y: PAGE_HEIGHT - 210,
    width: 100,
    height: 50,
    borderWidth: 0.5,
    color: rgb(0.752, 0, 0),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 364,
    y: PAGE_HEIGHT - 210,
    width: 100,
    height: 50,
    borderWidth: 0.5,
    color: rgb(0.752, 0, 0),
  });

  page3.drawText('Servicios', {
    x: PAGE_BORDER + 155,
    y: PAGE_HEIGHT - 190,
    color: rgb(1, 1, 1, 1),
    size: FONT_SIZE + 1,
    font: helveticaFont,
  });

  page3.drawText('Límite económico', {
    x: PAGE_BORDER + 285,
    y: PAGE_HEIGHT - 190,
    color: rgb(1, 1, 1, 1),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  drawMultilineText({
    page: page3,
    lines: ['Cantidad de', 'servicios anuales'],
    font: helveticaFont,
    color: rgb(1, 1, 1, 1),
    x: PAGE_BORDER + 370,
    y: PAGE_HEIGHT - 185,
    containerWidth: 90,
  });

  // // ---------
  page3.drawRectangle({
    x: PAGE_BORDER + 64,
    y: PAGE_HEIGHT - 235,
    width: containerWidth,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 264,
    y: PAGE_HEIGHT - 235,
    width: 100,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 364,
    y: PAGE_HEIGHT - 235,
    width: 100,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawText('Médico a domicilio', {
    x: PAGE_BORDER + 70,
    y: PAGE_HEIGHT - 225,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('-', {
    x: PAGE_BORDER + 315,
    y: PAGE_HEIGHT - 225,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('2 eventos', {
    x: PAGE_BORDER + 395,
    y: PAGE_HEIGHT - 225,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // ---------
  page3.drawRectangle({
    x: PAGE_BORDER + 64,
    y: PAGE_HEIGHT - 260,
    width: containerWidth,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 264,
    y: PAGE_HEIGHT - 260,
    width: 100,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 364,
    y: PAGE_HEIGHT - 260,
    width: 100,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawText('Compra nocturna de medicamentos', {
    x: PAGE_BORDER + 70,
    y: PAGE_HEIGHT - 250,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('Compras superiores', {
    x: PAGE_BORDER + 276,
    y: PAGE_HEIGHT - 247,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('a $10.000 clp', {
    x: PAGE_BORDER + 284,
    y: PAGE_HEIGHT - 256,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('Ilimitado', {
    x: PAGE_BORDER + 396,
    y: PAGE_HEIGHT - 250,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // ---------
  page3.drawRectangle({
    x: PAGE_BORDER + 64,
    y: PAGE_HEIGHT - 285,
    width: containerWidth,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 264,
    y: PAGE_HEIGHT - 285,
    width: 100,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 364,
    y: PAGE_HEIGHT - 285,
    width: 100,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawText('Kinesiología respiratoria a domicilio', {
    x: PAGE_BORDER + 70,
    y: PAGE_HEIGHT - 275,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('-', {
    x: PAGE_BORDER + 315,
    y: PAGE_HEIGHT - 275,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('1 evento', {
    x: PAGE_BORDER + 396,
    y: PAGE_HEIGHT - 275,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // ---------
  page3.drawRectangle({
    x: PAGE_BORDER + 64,
    y: PAGE_HEIGHT - 310,
    width: containerWidth,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 264,
    y: PAGE_HEIGHT - 310,
    width: 100,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 364,
    y: PAGE_HEIGHT - 310,
    width: 100,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawText('Orientación médica telefónica', {
    x: PAGE_BORDER + 70,
    y: PAGE_HEIGHT - 300,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('Ilimitado', {
    x: PAGE_BORDER + 300,
    y: PAGE_HEIGHT - 300,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('Ilimitado', {
    x: PAGE_BORDER + 396,
    y: PAGE_HEIGHT - 300,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // ---------
  page3.drawRectangle({
    x: PAGE_BORDER + 64,
    y: PAGE_HEIGHT - 335,
    width: containerWidth,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 264,
    y: PAGE_HEIGHT - 335,
    width: 100,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 364,
    y: PAGE_HEIGHT - 335,
    width: 100,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawText('Traslado Médico terrestre en caso de accidente', {
    x: PAGE_BORDER + 70,
    y: PAGE_HEIGHT - 325,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('4 UF', {
    x: PAGE_BORDER + 305,
    y: PAGE_HEIGHT - 325,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('1 evento', {
    x: PAGE_BORDER + 396,
    y: PAGE_HEIGHT - 325,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // ---------
  page3.drawRectangle({
    x: PAGE_BORDER + 64,
    y: PAGE_HEIGHT - 360,
    width: containerWidth,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 264,
    y: PAGE_HEIGHT - 360,
    width: 100,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 364,
    y: PAGE_HEIGHT - 360,
    width: 100,
    height: 25,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawText('Beneficio Ahorro Salud', {
    x: PAGE_BORDER + 70,
    y: PAGE_HEIGHT - 350,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('Ilimitado', {
    x: PAGE_BORDER + 300,
    y: PAGE_HEIGHT - 350,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('Ilimitado', {
    x: PAGE_BORDER + 396,
    y: PAGE_HEIGHT - 350,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // ---------
  page3.drawRectangle({
    x: PAGE_BORDER + 64,
    y: PAGE_HEIGHT - 430,
    width: containerWidth,
    height: 70,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 264,
    y: PAGE_HEIGHT - 430,
    width: 100,
    height: 70,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: PAGE_BORDER + 364,
    y: PAGE_HEIGHT - 430,
    width: 100,
    height: 70,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawText('Toma de Exámenes Preventivos:', {
    x: PAGE_BORDER + 70,
    y: PAGE_HEIGHT - 375,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('    • Perfil Bioquímico', {
    x: PAGE_BORDER + 70,
    y: PAGE_HEIGHT - 390,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('    • Perfil Lipídico', {
    x: PAGE_BORDER + 70,
    y: PAGE_HEIGHT - 405,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('    • Orina Completa', {
    x: PAGE_BORDER + 70,
    y: PAGE_HEIGHT - 420,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('Ilimitado', {
    x: PAGE_BORDER + 300,
    y: PAGE_HEIGHT - 390,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('1 evento por cada', {
    x: PAGE_BORDER + 380,
    y: PAGE_HEIGHT - 390,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('tipo de examen', {
    x: PAGE_BORDER + 385,
    y: PAGE_HEIGHT - 400,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('DESCRIPCIÓN DE LOS SERVICIOS:', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 460,
    size: SUB_TITLE_FONT_SIZE - 1,
    font: helveticaBoldFont,
    color: rgb(1, 0.0039, 0),
  });

  page3.drawText('MEDICO A DOMICILIO:', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 480,
    size: SUB_TITLE_FONT_SIZE - 1,
    font: helveticaBoldFont,
    color: rgb(1, 0.0039, 0),
  });

  drawMultilineText({
    page: page3,
    lines: [
      'El Cliente podrá solicitar a Sur Asistencia la coordinación y gestión de Médico a domicilio del área de medicina general. El Cliente podrá realizar la',
      'solicitud 24/7, pero la entrega del servicio dependerá de la disponibilidad de profesionales, horario de la solicitud y ubicación geográfica del Cliente,',
      'pues el servicio no está orientado a tratar urgencias en que se encuentre en riesgo la vida del Cliente.',
      '',
      'El Médico a Domicilio estará facultado a entregar orden de reposo médico, en caso de ser procedente, y recetas médicas. Para aquellos casos en que se',
      'requiera reposo médico y el médico no cuente con formulario al momento de la atención, la orden será enviada por el profesional al correo electrónico',
      'indicado por el Cliente.',
      '',
      'La coordinación de esta asistencia aplicará en las capitales regionales del país.',
    ],
    alignment: 'left',
    y: PAGE_HEIGHT - 500,
  });

  page3.drawText('Límite: 2 eventos anuales.', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 600,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page3.drawText('COMPRA NOCTURNA DE MEDICAMENTOS:', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 640,
    size: SUB_TITLE_FONT_SIZE - 1,
    font: helveticaBoldFont,
    color: rgb(1, 0.0039, 0),
  });

  drawMultilineText({
    page: page3,
    lines: [
      'El Cliente puede solicitar a Sur Asistencia S.A. la coordinación de un servicio de localización, compra y entrega de medicamentos en su domicilio.',
      '',
      'Los requisitos para acceder a esta prestación son:',
      '',
      '   • El servicio estará disponible sólo para compras entre las 23:00hrs. y las 06:00hrs, siempre que las condiciones sociales, climáticas y de',
      '     seguridad nacional lo permitan.',
      '',
      '   • La compra de medicamentos debe ser superior a $10.000.-, siendo el costo de los medicamentos de cargo del cliente.',
      '',
      '   • No se podrá utilizar este servicio para el caso de medicamentos con receta retenida ni se podrán presentar tarjetas y/o cupones de descuento.',
      '',
      '   • El domicilio del Cliente debe estar dentro de radios urbanos.',
    ],
    alignment: 'left',
    y: PAGE_HEIGHT - 660,
  });

  page3.drawText('Límite: 2 eventos anuales.', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 790,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  // -------------------------- Page 4 --------------------------

  page4.drawText('KINESIOLOGÍA RESPIRATORIA A DOMICILIO', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 90,
    size: SUB_TITLE_FONT_SIZE - 1,
    font: helveticaBoldFont,
    color: rgb(1, 0.0039, 0),
  });

  drawMultilineText({
    page: page4,
    lines: [
      'El Cliente solicitará a Sur Asistencia la coordinación y gestión de un profesional especialista en Kinesiología respiratoria a domicilio, ',
      'a fin de controlar y aliviar los síntomas y complicaciones en pacientes, tanto adultos como niños, con problemas respiratorios.',
      '',
      'La coordinación de esta asistencia aplicará en las capitales regionales del país.',
    ],
    alignment: 'left',
    y: PAGE_HEIGHT - 110,
  });

  page4.drawText('Límite: 1 evento anual.', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 160,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page4.drawText('ORIENTACIÓN MEDICA TELEFÓNICA', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 200,
    size: SUB_TITLE_FONT_SIZE - 1,
    font: helveticaBoldFont,
    color: rgb(1, 0.0039, 0),
  });

  drawMultilineText({
    page: page4,
    lines: [
      'El servicio de Mediphone es la conexión telefónica con un médico a cualquier hora del día, las 24 horas y los 365 días del año, ',
      'para que orientar al Cliente ante cualquier consulta médica que pudiera tener. Este servicio de información es proporcionado',
      'por el equipo médico de Sur Asistencia S.A., teniendo éste un carácter meramente informativo por lo que no reemplaza bajo ninguna',
      'circunstancia la consulta presencial de un médico, no permite un diagnóstico telefónico definitivo ni prescripción de medicamentos.',
      '',
      'Sin que la siguiente enumeración sea taxativa, el servicio de Mediphone incluye:',
      '',
      '   • Consultas sobre urgencias médicas y primeros auxilios: Orientado a responder las inquietudes relacionadas con las principales ',
      '     urgencias médicas de frecuente ocurrencia y procedimientos de primeros auxilios.',
      '',
      '   • Información sobre medicamentos: Orientado a responder consultas acerca del uso de medicamentos como reacciones adversas a la medicación,',
      '     efectos secundarios, contraindicaciones, interacción entre medicamentos, entre otros.',
      '',
      '   • Consulta sobre evolución de tratamientos: Consultas acerca de las inquietudes que surjan en torno a un tratamiento médico en curso.',
      '     Esta prestación es de carácter referencial y en ningún caso reemplaza la consulta con el médico tratante.',
      '',
      '   • Información sobre centros de la red médica pública y privada: el Cliente podrá solicitar toda información disponible en Sur Asistencia S.A.',
      '     acerca de los principales servicios de atención médica, tanto públicos como privados. Se entregará información referente a teléfonos, direcciones',
      '     y horarios de las principales clínicas, centros médicos y dentales del país.',
      '',
      '   • Orientación Futura Mamá: Dietas, actividad física, uso de medicamentos durante el embarazo, información sobre patologías propias del embarazo,',
      '     cuidados especiales ante enfermedades previamente diagnosticadas, etc.',
      '',
      '   • Orientación Recién Nacido: Lactancia, cuidados y dietas, uso de medicamentos durante la lactancia, vacunas, cuidados perinatales de madre e hijo,',
      '     prevención.',
      '',
      '   • Servicio de Información Pediátrica: Se entregará al Cliente que así lo solicite, información relativa a salud, nutrición, pestes, vómitos, cólicos,',
      '     dolores estomacales, contagios, temas respecto a la leche materna, trastornos del sueño, tratamientos, entre otros.',
      '',
      '   • Información sobre Farmacias: Sur Asistencia S.A. dispondrá durante las 24 horas del día, información relevante acerca de farmacias y servicios',
      '     afines que pueda requerir el Cliente, entre ellos, direcciones y teléfonos, farmacias de turno y otros servicios ofrecidos por las redes farmacéuticas',
      '     del país.',
      '',
      '   • Información adicional: Orientación sobre enfermedades, dolencias, síntomas, malestares, imprevistos de salud, seguimiento de enfermedades',
      '     crónicas, medidas de auto cuidado en salud, interpretación de exámenes, prevención cáncer de mamá, frecuencia de Papanicolaou, fertilidad,',
      '     sexualidad y embarazo, etc.',
    ],
    alignment: 'left',
    y: PAGE_HEIGHT - 220,
  });

  page4.drawText('Límite: ilimitado.', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 590,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page4.drawText('TRASLADO MÉDICO TERRESTRE EN CASO DE ACCIDENTE', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 630,
    size: SUB_TITLE_FONT_SIZE - 1,
    font: helveticaBoldFont,
    color: rgb(1, 0.0039, 0),
  });

  drawMultilineText({
    page: page4,
    lines: [
      'Servicio de coordinación y gestión de traslado médico terrestre en favor del Cliente por motivo de accidente sufrido por éste',
      'que impida el traslado por sus propios medios, siempre que no implique riesgo vital, desde el lugar del incidente hasta el Centro Asistencial más',
      'cercano y siempre que la infraestructura privada permita un adecuado tratamiento médico,',
      'conforme calificación previa por parte de Sur Asistencia S.A.',
      '',
      'Este traslado médico terrestre se realizará en el medio de transporte más idóneo para cada caso, a discreción el facultativo que atienda la solicitud',
      'del Cliente. Para el caso en que se decida la conveniencia de uso de ambulancia, Sur Asistencia S.A. dispondrá de traslado en ambulancia básica.',
    ],
    alignment: 'left',
    y: PAGE_HEIGHT - 650,
  });

  page4.drawText('Límite: UF 4, 1 evento anual.', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 730,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  // -------------------------- Page 5 --------------------------

  page5.drawText('BENEFICIOS AHORRO SALUD', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 90,
    size: SUB_TITLE_FONT_SIZE - 1,
    font: helveticaBoldFont,
    color: rgb(1, 0.0039, 0),
  });

  drawMultilineText({
    page: page5,
    lines: [
      'Sur Asistencia pone a disposición de los Clientes Amicar, una serie de descuentos dinámicos relacionados al área de la salud a nivel nacional.',
      'Estos descuentos se aplicarán a la red de prestadores en convenio con Sur Asistencia respecto de los siguientes ítems:',
      '',
      '  •   Consultas de medicina General y de especialidades.',
      '  •   Ópticas',
      '  •   Médico a domicilio',
      '  •   Laboratorio de imageneología',
      '  •   Traslados en ambulancia',
      '  •   Procedimientos dentales',
      '  •   Enfermería',
      '',
      'Sur Asistencia, en caso de ser procedente por tratarse de un sistema dinámico de descuentos en que varían los beneficios ofrecidos periódicamente, ',
      'podrá generar nuevos convenios, modificar las características del descuento o quitar alguno de los descuentos indicados anteriormente respecto',
      'de los prestadores en convenio.',
      '',
      'El presente servicio se brindará sin límite de eventos, y se basa únicamente en la intermediación entre el Cliente y el Prestador del servicio,',
      'para la aplicación del descuento.',
    ],
    alignment: 'left',
    y: PAGE_HEIGHT - 110,
  });

  addUnderlineText({
    page: page5,
    text: 'OPERATIVA DE SERVICIO DE BENEFICIO AHORRO SALUD:',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 290,
  });

  drawMultilineText({
    page: page5,
    lines: [
      'Para activar este beneficio de descuento, el Cliente deberá tomar contacto con la Central telefónica de Sur Asistencia e indicar el ítem para el que',
      'requiere descuento, en esa misma llamada se le informará de los prestadores actualmente en convenio para la aplicación de descuentos respecto del',
      'ítem solicitado y las condiciones del descuento otorgado por el prestador. En caso de aceptación por parte del Cliente respecto del prestador y de las',
      'condiciones del descuento, Sur Asistencia emitirá un cupón de descuento único, el que será enviado como e-ticket al correo electrónico que informe',
      'el Cliente, debiendo el Cliente presentarlo al momento de realizar la compra o solicitud de atención.',
      '',
      'Estos cupones no serán acumulables entre descuentos del mismo tipo ni respecto de otros descuentos ofrecidos en el mercado.',
    ],
    alignment: 'left',
    y: PAGE_HEIGHT - 310,
  });

  page5.drawText('Límite: ilimitado', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 390,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page5.drawText('TOMA DE EXÁMENES MÉDICOS', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 420,
    size: SUB_TITLE_FONT_SIZE - 1,
    font: helveticaBoldFont,
    color: rgb(1, 0.0039, 0),
  });

  drawMultilineText({
    page: page5,
    lines: [
      'Sur Asistencia coordinará y gestionará la correspondiente toma de examen médico, a solicitud del Cliente, siempre que el examen médico',
      'solicitado esté debidamente indicado en orden emitida por un profesional de la salud. Para hacer efectivo este servicio, el Cliente',
      'deberá contactarse con la Central telefónica de Sur Asistencia, a fin de entregar la información necesaria para la coordinación con un',
      'Laboratorio Clínico según ciudad en la que se encuentre el Cliente.',
      '',
      'Este servicio no contempla la interpretación de los resultados de exámenes médicos.',
      '',
      'Los exámenes que puede solicitar el cliente son:',
      '',
      '  •   Perfil bioquímico',
      '  •   Perfil lipídico',
      '  •   Orina completa.',
    ],
    alignment: 'left',
    y: PAGE_HEIGHT - 440,
  });

  page5.drawText('Límite: 1 exámen al año por cada tipo de exámen.', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 570,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page5.drawText('PROCEDIMIENTO DE SOLICITUD DE SERVICIOS DESCRITOS', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 600,
    size: SUB_TITLE_FONT_SIZE - 1,
    font: helveticaBoldFont,
    color: rgb(1, 0.0039, 0),
  });

  drawMultilineText({
    page: page5,
    lines: [
      'Sur Asistencia S.A. coordinará y prestará los servicios contratados señalados en estas condiciones y que hayan sido contratados por el cliente, ',
      'de la siguiente forma: ',
      '',
      'El Cliente de los servicios descritos, deberá realizar la solicitud de asistencia, a través de un llamado telefónico, al número',
      'Los encargados de otorgar la asistencia solicitarán los datos básicos del Cliente, validándose así los datos. En caso de ser procedente,',
      'se coordinarán el o los servicios solicitados por Cliente.',
      '',
      '• Datos básicos que debe proporcionar el cliente:',
      '   -   Nombre y Apellido del contratante',
      '   -   Rut de contratante',
      '   -   Relación de parentesco con el Cliente titular, en caso de ser distinto al del Cliente del servicio',
      '   -   Ubicación geográfica',
      '   -   Teléfono de contacto',
      '   -   Correo electrónico.',
    ],
    alignment: 'left',
    y: PAGE_HEIGHT - 620,
  });

  page5.drawText('600 210 0010.', {
    x: PAGE_BORDER + 436,
    y: PAGE_HEIGHT - 650,
    color: rgb(1, 0.0039, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  // -------------------------- Page 6 --------------------------

  page6.drawText('PROCEDIMIENTO PARA EVALUACIÓN DE REEMBOLSO DE GASTOS INCURRIDOS', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 90,
    size: SUB_TITLE_FONT_SIZE - 1,
    font: helveticaBoldFont,
    color: rgb(1, 0.0039, 0),
  });

  drawMultilineText({
    page: page6,
    lines: [
      'Los eventuales reembolsos que puedan proceder, serán de carácter excepcional, y sólo para los casos en que, por fuerza mayor, Sur Asistencia',
      'se vea impedida de prestar los servicios, como, asimismo, para el caso en que no se cuente con disponibilidad profesional para el',
      'cumplimiento de los servicios de médico a domicilio o kinesiólogo respiratorio a domicilio. En este último caso, Sur Asistencia',
      'deberá haber autorizado previamente la coordinación de los servicios directamente por el Cliente y los valores por sesión deberán',
      'ser equivalentes al uso habitual para ese tipo de servicios. En este sentido, el servicio de médico a domicilio tendrá un límite',
      'de 1,5 UF por 2 eventos anuales, mientras que el servicio de kinesiólogo a domicilio tendrá un límite de 1 UF por 1 evento anual.',
      '',
      'Todos los reembolsos deberán contar con la autorización de la Central de Asistencia de Sur Asistencia. El procedimiento de evaluación',
      'de reembolso, para los casos detallados en los servicios de asistencia descritos en estas condiciones, es el siguiente: ',
      '',
      '   •   Haber contactado previamente a la Central de Asistencia de Sur Asistencia a fin de informar del hecho que activa alguno de los',
      '       servicios detallados en este certificado.',
      '   •   Toda documentación que respalde el gasto incurrido por el Cliente, deberá ser enviado en copia escaneada a la siguiente casilla',
      '       de correo: reembolso@surasistencia.cl, dentro de los 5 días siguientes a que se haya incurrido en el gasto.',
      '   •   Toda solicitud de reembolso deberá ser revisada y autorizada por el departamento a cargo de la evaluación.',
      '   •   El plazo para el análisis y pago de reintegros será de 15 días hábiles como máximo, contados desde la fecha de recepción',
      '       de la documentación en la casilla de correo indicada en el segundo punto.',
      '   •   En caso de que un reembolso sea rechazado, se enviará motivo de rechazo a cliente mediante carta o correo electrónico,',
      '       fundamentando por escrito la improcedencia del reembolso solicitado.',
      '   •   Luego de autorizada la solicitud de reembolso, se hará efectivo el reintegro a través de transferencia electrónica a la cuenta',
      '       bancaria del cliente, para lo cual se deberá informar el Banco, número de cuenta y datos del Cliente titular del servicio.',
    ],
    alignment: 'left',
    y: PAGE_HEIGHT - 110,
  });

  page6.drawText('SITUACIONES NO CONTEMPLADAS DENTRO DE LOS SERVICIOS:', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 350,
    size: SUB_TITLE_FONT_SIZE - 1,
    font: helveticaBoldFont,
    color: rgb(1, 0.0039, 0),
  });

  drawMultilineText({
    page: page6,
    lines: [
      'Los servicios de asistencia no serán prestados en las siguientes situaciones:',
      '     a)  Servicios que el Cliente haya concertado por su cuenta, sin dar aviso previo a la Central de Asistencia para la activación',
      '         del servicio y posterior coordinación de su requerimiento.',
      '     b)  Servicios recibidos por el Cliente sin la coordinación previa de Sur Asistencia.',
      '     c)  Cuando la persona que solicita el servicio no identifique al Cliente titular que contrató este producto de asistencias.',
      '     d)  Cuando la persona que solicite el servicio no proporcione información veraz y oportuna, y que, por su naturaleza, esto no ',
      '         permita atenderlo debidamente.',
      '     e)  Cuando por caso fortuito o fuerza mayor Sur Asistencia se encuentre impedida de prestar los servicios detallados en este',
      '         certificado.',
      '     f)  Cuando el Cliente incumpla cualquiera de las obligaciones indicadas en este certificado.',
      '     g)  No se considera la atención médica complementaria ordenada por Médico Especialista.',
      '     h)  Dentro de los reembolsos excepcionales, no se considerarán gastos médicos ambulatorios como: recetas, imágenes y',
      '         procedimientos programados, exámenes complementarios de Diagnóstico no contemplados.',
      '     i)  Enfermedades y/o accidentes derivados por el uso o abuso de consumo de estupefacientes, alcohol y/o drogas.',
      '     j)  Daños causados a sí mismo por alteración de sus facultades mentales.',
      '     k)  Traslado del Cliente de una clínica u hospital a otro centro de atención médica.',
      '',
      'Adicionalmente no son objeto de los servicios de este Producto de Asistencia, las situaciones de asistencia que presenten las siguientes',
      'causas:',
      '     a)  Mala fe, fraude o abuso de confianza del Cliente, comprobada por el personal de Sur Asistencia.',
      '     b)  Los fenómenos de la naturaleza de carácter extraordinario, imprevisible, inevitable e irresistible, tales como inundaciones,',
      '         terremotos, erupciones volcánicas, huracanes, tempestades ciclónicas, maremotos, etcétera, que impidan la prestación de los',
      '         servicios por parte de la red de prestadores de Sur Asistencia.',
      '     c)  Hechos y actos del hombre derivados de: terrorismo, guerra, guerrilla, vandalismo, asalto, motín o tumulto.',
      '     d)  Hechos y actos de fuerzas armadas y fuerzas o cuerpos de seguridad.',
      '     e)  Energía nuclear radiactiva.',
      '     f)  La ingestión de drogas, sustancias tóxicas, narcóticos o medicamentos sin prescripción médica.',
      '     g)  Enfermedades mentales.',
      '     h)  Prácticas deportivas en competencia profesional.',
      '     i)  Cuando el Cliente incumpla cualquiera de las obligaciones indicadas en estas condiciones.',
    ],
    alignment: 'left',
    y: PAGE_HEIGHT - 370,
  });

  page6.drawText('ÁMBITO TERRITORIAL', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 690,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  drawMultilineText({
    page: page6,
    lines: [
      'El servicio se extiende a todo el territorio nacional, con inclusión de la Isla Grande de Chiloé.',
      'Se exceptúan los demás territorios insulares. Lo anterior, sin perjuicio de los límites o ámbito',
      'territorial establecido para cada servicio de asistencia en particular.',
    ],
    alignment: 'left',
    y: PAGE_HEIGHT - 700,
  });

  page6.drawText('ATENCIÓN Y PRESTACIÓN INTEGRAL DEL SERVICIO', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 750,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  drawMultilineText({
    page: page6,
    lines: [
      'Lo proporcionará Sur Asistencia S.A. en forma integral las 24 horas del día y sus 365 días del año, tanto con su propia infraestructura',
      'como con su red de proveedores contactándose al siguiente número telefónico:',
    ],
    alignment: 'left',
    y: PAGE_HEIGHT - 760,
  });

  page6.drawText('600 210 0010', {
    x: PAGE_BORDER + 200,
    y: PAGE_HEIGHT - 805,
    color: rgb(1, 0.0039, 0),
    size: SUB_TITLE_FONT_SIZE,
    font: helveticaBoldFont,
  });

  return pdfDoc.saveAsBase64();
};
