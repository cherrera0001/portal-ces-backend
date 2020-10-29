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
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const PAGE_BORDER = 35;
const CELL_WIDTH = 125;

module.exports = async (args) => {
  const {
    startDate,
    endDate,
    contractNumber,
    plateNumber,
    chasisNumber,
    carBrand,
    carModel,
    carYear,
    carMileage,
    customer,
  } = args || {};
  const pdfDoc = await PDFDocument.create();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = await generatePages({ pdfDoc, amount: 4, helveticaFont, helveticaBoldFont });
  const headerCellSpace = (PAGE_WIDTH - PAGE_BORDER * 2 - 3 * CELL_WIDTH) / 2;
  const vehicleCellWidth = (PAGE_WIDTH - PAGE_BORDER * 2) / 4;
  const clientDataWidth = (PAGE_WIDTH - 2 * PAGE_BORDER) / 3;
  const [page, page2, page3, page4] = pages;

  page.drawText('CERTIFICADO DE SERVICIO ASISTENCIA', {
    x: 140,
    y: 750,
    size: TITLE_FONT_SIZE,
    font: helveticaBoldFont,
  });

  page.drawText('"GARANTÍA MECÁNICA USADOS" AMICAR', {
    x: 135,
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

  addSingleCell({
    page,
    text: 'PLACA PATENTE',
    font: helveticaBoldFont,
    x: 135,
    y: 640,
  });

  addSingleCell({
    page,
    text: 'NÚMERO DE CHASIS',
    font: helveticaBoldFont,
    x: 335,
    y: 640,
  });

  addSingleCell({
    page,
    text: 'MARCA',
    font: helveticaBoldFont,
    width: vehicleCellWidth,
    x: PAGE_BORDER,
    y: 600,
  });

  addSingleCell({
    page,
    text: 'MODELO',
    font: helveticaBoldFont,
    width: vehicleCellWidth,
    x: PAGE_BORDER + vehicleCellWidth,
    y: 600,
  });

  addSingleCell({
    page,
    text: 'AÑO',
    font: helveticaBoldFont,
    width: vehicleCellWidth,
    x: PAGE_BORDER + 2 * vehicleCellWidth,
    y: 600,
  });

  addSingleCell({
    page,
    text: 'KILOMETRAJE',
    font: helveticaBoldFont,
    width: vehicleCellWidth,
    x: PAGE_BORDER + 3 * vehicleCellWidth,
    y: 600,
    contentFont: helveticaFont,
  });

  addSeparatorRectangle({
    page,
    text: 'ANTECEDENTES DEL CONTRATANTE',
    font: helveticaBoldFont,
    backgroundColor: rgb(0.85, 0.85, 0.85),
    y: 550,
  });

  addSingleCell({
    page,
    text: 'NOMBRE',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: PAGE_WIDTH - 2 * PAGE_BORDER,
    textX: PAGE_BORDER + 5,
    x: PAGE_BORDER,
    y: 515,
    alignment: 'start',
  });

  addSingleCell({
    page,
    text: 'RUT',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: clientDataWidth,
    x: PAGE_BORDER,
    y: 481,
  });

  addSingleCell({
    page,
    text: 'DIRECCIÓN',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: PAGE_WIDTH - 2 * PAGE_BORDER,
    textX: PAGE_BORDER + 5,
    x: PAGE_BORDER,
    y: 447,
    alignment: 'start',
  });

  page.drawText('(Calle, Número, Departamento/Block, Comuna)', {
    x: PAGE_BORDER + 54,
    y: 452,
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
    y: 413,
  });

  addSingleCell({
    page,
    text: 'TELÉFONO',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: clientDataWidth,
    x: PAGE_BORDER + clientDataWidth,
    y: 413,
  });

  addSingleCell({
    page,
    text: 'CELULAR',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: clientDataWidth,
    x: PAGE_BORDER + 2 * clientDataWidth,
    y: 413,
  });

  addSeparatorRectangle({
    page,
    text: 'ACEPTACIÓN DE CONDICIONES',
    font: helveticaBoldFont,
    backgroundColor: rgb(0.85, 0.85, 0.85),
    y: 365,
  });

  drawMultilineText({
    page,
    lines: [
      '1.  Los servicios de asistencia descritos en la siguiente solicitud serán prestados por Sur Asistencia S.A. a través de su marca comercial',
      '     MAPFRE ASSISTANCE y su red de proveedores.',
      '2.  La contratación del servicio de asistencia es voluntario y el Cliente ha libremente consentido en su contratación.',
      '3.  Autorizo el tratamiento de datos personales contenidos en este formulario de acuerdo a lo dispuesto en el art. 4 de la ley 19.628 con la',
      '     finalidad de: (a) mantener un registro de sus clientes y de su relación comercial en general, al tenor de lo dispuesto en la Ley No19.628;',
      '     (b) comprobar la veracidad o falsedad de estos datos, en virtud de la misma norma legal; (c) compartir con terceros con quienes celebre',
      '     acuerdos comerciales, datos personales del Cliente para la correcta entrega de los servicios contratados u otros beneficios; (d) enviar',
      '     información sobre anuncios comerciales, promociones y ofertas de bienes y servicios. El Cliente, de conformidad con las normas legales,',
      '     siempre podrá solicitar la suspensión temporal o el término a su aceptación de recibir dichos anuncios comerciales, ofertas o',
      '     promociones.',
      '4.  Conforme a lo instruido por el Cliente, la tarifa correspondiente al servicio de asistencia será recaudada del crédito automotriz contratado',
      '     y pagada por Sociedad de Créditos Automotrices S.A a Sur Asistencia S.A..',
      '5.  La presente solicitud sólo entrará en vigencia una vez suscrita por el Cliente, habiendo Sur Asistencia S.A. recibido los antecedentes',
      '     correspondientes y habiéndose pagado la tarifa en la forma indicada en el numeral anterior.',
      '6.  Sur Asistencia S.A. en su calidad de otorgante del servicio de asistencia, asume las responsabilidades que emanan de su actuación',
      '     como contratante del servicio colectivo, entre las cuales está informar a los clientes u otros legítimos interesados sobre la contratación del',
      '     servicio y su entrada en vigencia.',
      '7.  El Cliente autoriza a Sur Asistencia S.A. a guardar la boleta por el costo del servicio, con la obligación de tenerla a disposición del Cliente',
      '     para su retiro por el plazo máximo de seis meses contados desde su emisión, transcurrido el cual cesará su obligación.',
      '8.  El presente documento establece el detalle de las Coberturas, Exclusiones, Condiciones y Ámbito Territorial del servicio de asistencia, las',
      '     cuales se entenderán aceptadas con la sola firma del cliente.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: 340,
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

  if (startDate) {
    page.drawText(String(startDate), {
      x: PAGE_BORDER + 3,
      y: 669,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (contractNumber) {
    page.drawText(String(contractNumber), {
      x: PAGE_BORDER + (CELL_WIDTH + headerCellSpace) + 3,
      y: 669,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (endDate) {
    page.drawText(String(endDate), {
      x: PAGE_BORDER + 2 * (CELL_WIDTH + headerCellSpace) + 3,
      y: 669,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (plateNumber) {
    page.drawText(String(plateNumber), {
      x: 138,
      y: 630,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (chasisNumber) {
    page.drawText(String(chasisNumber), {
      x: 338,
      y: 630,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (carBrand) {
    page.drawText(String(carBrand), {
      x: PAGE_BORDER + 3,
      y: 590,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (carModel) {
    page.drawText(String(carModel), {
      x: PAGE_BORDER + vehicleCellWidth + 3,
      y: 590,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (carYear) {
    page.drawText(String(carYear), {
      x: PAGE_BORDER + 2 * vehicleCellWidth + 3,
      y: 590,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (carMileage) {
    page.drawText(String(carMileage), {
      x: PAGE_BORDER + 3 * vehicleCellWidth + 3,
      y: 590,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  } else {
    page.drawText('NN', {
      x: PAGE_BORDER + 3 * vehicleCellWidth + 3,
      y: 590,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.name) {
    page.drawText(String(customer.name), {
      x: PAGE_BORDER + 3,
      y: 504,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.identificationValue) {
    page.drawText(String(customer.identificationValue), {
      x: PAGE_BORDER + 3,
      y: 470,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.address) {
    page.drawText(String(customer.address), {
      x: PAGE_BORDER + 3,
      y: 436,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.city) {
    page.drawText(String(customer.city), {
      x: PAGE_BORDER + 3,
      y: 402,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.phone) {
    page.drawText(String(customer.phone), {
      x: PAGE_BORDER + clientDataWidth + 3,
      y: 402,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (customer && customer.cellPhone) {
    page.drawText(String(customer.cellPhone), {
      x: PAGE_BORDER + 2 * clientDataWidth + 3,
      y: 402,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  // -------------------------- Page 2 --------------------------

  drawMultilineText({
    page: page2,
    lines: [
      'La prestación del servicio de GARANTÍA MECÁNICA consiste en cubrir los daños o averías de las piezas detalladas en este',
      'certificado, proporcionando la mano de obra y los repuestos que sean necesarios para restablecer las condiciones normales de',
      'funcionamiento del vehículo, siempre que dicha reparación sea necesaria por una falla mecánica o eléctrica del vehículo durante el',
      'período de vigencia del contrato en su uso normal, no comercial, sin perjuicio de las condiciones y exclusiones contenidas en este',
      'contrato, con el objetivo de generar al cliente un ahorro en la reparación de su vehículo.',
    ],
    font: helveticaBoldFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 90,
  });

  addSeparatorRectangle({
    page: page2,
    text: 'CONDICIONES GENERALES',
    alignment: 'left',
    font: helveticaBoldFont,
    backgroundColor: rgb(1, 1, 1),
    borderWidth: 0.5,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 160,
  });

  addUnderlineText({
    page: page2,
    text: 'Vehículo Cubierto',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 180,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'Se entenderá por vehículo cubierto al que aparezca identificado en la información aportada por AMICAR. La cobertura se otorga',
      'exclusivamente a dicho vehículo, siempre que no se trate de motocicletas, vehículos de servicio público, traslado de pasajeros o uso comercial,',
      'o vehículos cuyo peso máximo autorizado sobrepase los 3.000 kgs.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 195,
  });

  addUnderlineText({
    page: page2,
    text: 'Daño o Avería',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 240,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'A todos los efectos del presente documento, se entiende por daño o avería la inutilidad operativa (conforme con las especificaciones del',
      'fabricante) de la pieza garantizada, debido a una rotura imprevista o un fallo mecánico o eléctrico, producido dentro de la vigencia del servicio.',
      'No se incluye en esta definición la reducción gradual en el rendimiento operativo de la pieza garantizada que sea proporcional y equivalente a',
      'su antigüedad y kilometraje, ni los accidentes o cualquier influencia externa, ni fallas preexistentes.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 255,
  });

  addUnderlineText({
    page: page2,
    text: 'Mano de Obra',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 310,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'Precios o tarifas de tiempo de trabajo humano según servicios requeridos en las reparaciones y/o sustitución de piezas o repuestos.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 325,
  });

  addUnderlineText({
    page: page2,
    text: 'Reparar y/o sustituir una pieza o repuesto',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 345,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'Arreglar, habilitar o cambiar una pieza o repuesto averiado, a fin de conseguir de ésta un correcto funcionamiento.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 360,
  });

  addUnderlineText({
    page: page2,
    text: 'Prestador del Servicio',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 380,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'Persona que se obliga a prestar los servicios descritos en el presente documento. El prestador del servicio es Mapfre Assistance, directamente',
      'o a través de los proveedores o centros de servicios autorizados.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 395,
  });

  addUnderlineText({
    page: page2,
    text: 'Plan de inspección y Mantenimiento',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 430,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'Es el conjunto de revisiones y trabajos que deben realizarse sobre el vehículo amparado durante la vigencia del contrato, por parte de un taller',
      'mecánico debidamente autorizado y dotado de los medios técnicos y tecnológicos suficientes.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 445,
  });

  addUnderlineText({
    page: page2,
    text: 'Antigüedad y Kilometraje',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 480,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'Las referencias en este contrato se entienden a partir de la vigencia del producto, y no a partir de la solicitud del servicio de Garantía Mecánica.',
      'En tal sentido, las coberturas contempladas en este servicio serán aplicables a vehículos de antigüedad máxima de 8 (ocho) años y menos de',
      '130.000 (ciento treinta mil) kilómetros de recorrido, desde el momento de la primera matrícula del vehículo amparado. La cobertura no aplicará',
      'a vehículos cuyo kilometraje supere los 215.000 km al momento de solicitar el servicio de Garantía Mecánica.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 495,
  });

  addUnderlineText({
    page: page2,
    text: 'Plan',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 550,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'Se refiere al conjunto de piezas cubiertas durante un periodo de tiempo determinado o un máximo de kilometraje según lo contemplado en el',
      'presente documento, al cual accede el solicitante, y que consta en la solicitud de servicio.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 565,
  });

  addUnderlineText({
    page: page2,
    text: 'Vigencia',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 600,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'La vigencia de las coberturas está dada por el periodo del crédito, contados a partir de la entrega del vehículo y hasta que el crédito sea',
      'liquidado.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 615,
  });

  addUnderlineText({
    page: page2,
    text: 'Piezas Cubiertas',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 645,
  });

  drawMultilineText({
    page: page2,
    lines: ['Las partes cubiertas para vehículos de hasta 12 años de antigüedad.'],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 660,
  });

  addUnderlineText({
    page: page2,
    text: 'Ámbito Territorial',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 685,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'El derecho a las prestaciones contempladas en la cobertura se refiere a contingencias que afecten al vehículo cubierto que ocurran a una',
      'distancia superior a 0Km desde el domicilio del cliente que figura como titular.',
      'El ámbito territorial de las coberturas es en todo Chile continental más la Isla Grande de Chiloé, excluyendo los demás territorios insulares.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 700,
  });

  // // -------------------------- Page 3 --------------------------

  addSeparatorRectangle({
    page: page3,
    text: 'DETALLE DE LAS COBERTURAS DE GARANTÍA MECÁNICA',
    alignment: 'left',
    font: helveticaBoldFont,
    backgroundColor: rgb(1, 1, 1),
    borderWidth: 0.5,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 100,
  });

  page3.drawText('PLAN DE GARANTIA MECÁNICA', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 120,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  drawMultilineText({
    page: page3,
    lines: [
      'Las piezas y/o partes indicadas a continuación, son las cubiertas por el servicio de GARANTÍA MECÁNICA. Otras piezas y/o partes no',
      'mencionadas del conjunto, no están consideraras en el plan de cobertura.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 140,
  });

  const containerWidth = 250;

  const leftBorder = PAGE_BORDER + (PAGE_WIDTH - PAGE_BORDER * 2 - 2 * containerWidth) / 2;

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 180,
    width: 2 * containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(0.5, 0.5, 0.5),
  });

  const coverageTitle = 'COBERTURAS';
  let textWidth = helveticaFont.widthOfTextAtSize(coverageTitle, FONT_SIZE);
  let textX = PAGE_WIDTH / 2 - textWidth / 2;

  page3.drawText(coverageTitle, {
    x: textX,
    y: PAGE_HEIGHT - 175,
    color: rgb(1, 1, 1, 1),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 195,
    width: 2 * containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });

  const engineTitle = 'MOTOR';
  textWidth = helveticaFont.widthOfTextAtSize(engineTitle, FONT_SIZE);
  textX = PAGE_WIDTH / 2 - textWidth / 2;

  page3.drawText(engineTitle, {
    x: textX,
    y: PAGE_HEIGHT - 190,
    color: rgb(1, 1, 1, 1),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // ------------

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 210,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder + containerWidth,
    y: PAGE_HEIGHT - 210,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 225,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder + containerWidth,
    y: PAGE_HEIGHT - 225,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 240,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder + containerWidth,
    y: PAGE_HEIGHT - 240,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 255,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder + containerWidth,
    y: PAGE_HEIGHT - 255,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 270,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder + containerWidth,
    y: PAGE_HEIGHT - 270,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 285,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder + containerWidth,
    y: PAGE_HEIGHT - 285,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 300,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder + containerWidth,
    y: PAGE_HEIGHT - 300,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 315,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder + containerWidth,
    y: PAGE_HEIGHT - 315,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 330,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder + containerWidth,
    y: PAGE_HEIGHT - 330,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  // --------------

  // addUnderlineText({
  //   page: page2,
  //   text: 'RECAMBIO DEL NEUMÁTICO EN CASO DE DAÑO ACCIDENTAL',
  //   font: helveticaBoldFont,
  //   fontSize: FONT_SIZE,
  //   x: PAGE_BORDER,
  //   y: PAGE_HEIGHT - 305,
  // });

  // drawMultilineText({
  //   page: page2,
  //   lines: [
  //     'En caso daños accidentales de un neumático (magulladura* o impacto en acera o bache) en vehículo cubierto, producido por riesgos en la',
  //     'carretera bajo condiciones de conducción normal y en caminos públicos, siendo estos caminos aptos de acuerdo a modelo y diseño del',
  //     'neumático, y cuyo daño represente la necesidad de recambio del neumático dañado, Mapfre Assistance realizará la reposición del neumático',
  //     'afecto a esta asistencia y de acuerdo a los límites establecidos, luego de evaluación y autorización de este.',
  //     '',
  //     'En el mismo evento se enviará al lugar de la ocurrencia del siniestro con la mayor prontitud posible un operario para realizar el cambio del',
  //     'neumático dañado al vehículo cubierto, por el neumático de emergencia que posea el cliente al momento de la inmovilización del vehículo,',
  //     'dentro de radios urbanos** para efectos que este pueda seguir circulando.',
  //     '',
  //     'En caso de que el cliente no cuente con un neumático de repuesto o bien haya dañado más de un (1) neumático y haya producido la',
  //     'inmovilización del vehículo, Mapfre Assistance ofrecerá al cliente la posibilidad de realizar el traslado del vehículo al concesionario más cercano',
  //     'al lugar del evento del daño. El costo del servicio de grúa será de cargo del cliente.',
  //     '',
  //     'Una vez asistido el cliente, se realizará la evaluación del neumático dañado por personal autorizado por Mapfre Assistance y según la',
  //     'autorización de este, se realizará el recambio de él o los neumáticos dañados accidentalmente y que cuenten con el servicio de asistencia',
  //     'vigente. El cambio de él o los neumáticos por uno nuevo será por uno igual o que cumpla las mismas características de él o los neumáticos',
  //     'dañados accidentalmente (aro, radio y medidas) sin exceder el tope de cobertura. La instalación de este nuevo neumático es de',
  //     'responsabilidad y cargo del cliente.',
  //     '',
  //     '* Por magulladura se entiende golpe fuerte o golpe violento.',
  //     '** Por radio urbano se define la ciudad como tal definida por su límite urbano y 20 Km. máximo a su alrededor desde sus límites, siempre que',
  //     '    las rutas de acceso lo permitan (camino transitable por un automóvil).',
  //   ],
  //   font: helveticaFont,
  //   alignment: 'left',
  //   y: PAGE_HEIGHT - 330,
  // });

  // addSeparatorRectangle({
  //   page: page2,
  //   text: 'CONDICIONES PARTICULARES',
  //   alignment: 'left',
  //   font: helveticaBoldFont,
  //   backgroundColor: rgb(1, 1, 1),
  //   borderWidth: 0.5,
  //   x: PAGE_BORDER,
  //   y: PAGE_HEIGHT - 570,
  // });

  // drawMultilineText({
  //   page: page2,
  //   lines: [
  //     'Para la solicitud de cobertura, el cliente debe comunicarse inmediatamente con la central de Mapfre Assistance para recibir la atención',
  //     'necesaria, es decir, llamadas posteriores para la solicitud de servicio no se considerarán dentro de las coberturas del producto.',
  //     '',
  //     {
  //       title: 'Límite:',
  //       text: 'USD $250 por neumático, con un máximo 1 evento anual por neumático, y hasta 2 neumáticos por evento.',
  //     },
  //     {
  //       title: 'Deducible:',
  //       text:
  //         'USD $20 por neumático, sólo cuando exista recambio. En el caso de neumáticos Run Flat System y/o de Invierno, el deducible',
  //     },
  //     'será de USD $50 por neumático, sólo cuando exista recambio.',
  //     '',
  //     'Los neumáticos cubiertos son sólo aquellos que estén ingresados en las bases de datos de Mapfre Assistance. Los neumáticos reemplazados',
  //     'no se consideran dentro de las nuevas coberturas.',
  //   ],
  //   font: helveticaFont,
  //   alignment: 'left',
  //   y: PAGE_HEIGHT - 590,
  // });

  // // -------------------------- Page 3 --------------------------

  // drawMultilineText({
  //   page: page3,
  //   lines: [
  //     'Se entiende por Neumático: Pieza de caucho, con cámara de aire o sin ella, que se monta sobre la llanta de una rueda. En este caso, se',
  //     'entenderá por tal(es), aquellos montados en el vehículo del cliente especificado por AMICAR, teniendo en cuenta que la profundidad del dibujo',
  //     'de la banda de rodaje sea de, al menos, 2 milímetros de espesor en todo momento, y cumpla los siguientes requisitos:',
  //     '1. Llevar la marca legal "E" o "e", que certifica que el neumático cumple con los requisitos de dimensiones, rendimiento y marcado',
  //     '2. No ser neumáticos recauchados.',
  //     '3. No haber sido montado en un vehículo diferente al que aparezca identificado en la información aportada por AMICAR.',
  //     '4. Tener un código de velocidad W o inferior.',
  //     '5. Tener un ancho máximo de 225 milímetros y una relación entre la altura/ anchura de la sección de 50 como mínimo.',
  //     '6. No tratarse de neumáticos off road o nieve.',
  //     '7. No tratarse de neumáticos de emergencia o repuesto (compactos).',
  //     '',
  //     'Se entenderá por daño irreparable, luego de evaluación autorizada por Mapfre Assistance:',
  //     '1.Agujero de más de 6 mm de diámetro o rajadura de más de 10 mm de longitud, ya sea en la banda de rodamiento y/o en el flanco (pared lateral)',
  //     '2.Rotura de las telas radiales (cototos en la parte del flanco producto de fuertes apretones con cunetas)',
  //     '3.Deterioro del caucho en la banda de rodamiento por caminos con muchas piedras.',
  //   ],
  //   font: helveticaFont,
  //   alignment: 'left',
  //   y: PAGE_HEIGHT - 90,
  // });

  // addSeparatorRectangle({
  //   page: page3,
  //   text: 'EXCLUSIONES',
  //   alignment: 'left',
  //   font: helveticaBoldFont,
  //   backgroundColor: rgb(1, 1, 1),
  //   borderWidth: 0.5,
  //   x: PAGE_BORDER,
  //   y: PAGE_HEIGHT - 260,
  // });

  // drawMultilineText({
  //   page: page3,
  //   lines: [
  //     'Están excluidas las prestaciones y hechos siguientes:',
  //     '         a)  Se excluyen neumáticos para vehículos pesados (vehículos sobre 3.500 kg)',
  //     '         b)  Se excluyen neumáticos de usos especiales (ejemplo: off road, nieve).',
  //     '         c)  Desgaste normal y natural del neumático, el fallo en la suspensión o en la amortiguación y la falta de mantenimiento.',
  //     '         d)  Daños por la mala instalación o mantenimiento del neumático.',
  //     '         e)  Todo tipo de daño producido por:',
  //     '               * Baja o alta presión, o por utilización fuera de las especificaciones del fabricante.',
  //     '               * Intento de robo o incendio.',
  //     '         f)  Cualquier defecto de fabricación o preexistente al inicio de la cobertura del producto y/o las llamadas a revisión, incluidas las del',
  //     '             fabricante del vehículo.',
  //     '         g)  Defectos de llantas.',
  //     '         h)  Defectos que sean producidos por el vehículo.',
  //     '         i)  Conducción del vehículo fuera de carreteras.',
  //     '         j)  Conducción del vehículo a una velocidad mayor de la recomendada por el fabricante del neumático.',
  //     '         k)  Conducción del vehículo en caminos no aptos para el modelo y diseño del neumático.',
  //     '         l)  Pinchazos reparables.',
  //     '         m)  Daños intencionales (rasgaduras).',
  //     '         n)  Los daños como consecuencia de seguir circulando cuando los indicadores del vehículo señalan fallos en el funcionamiento de los',
  //     '             sistemas.',
  //     '         o)  Las averías a consecuencia de negligencias o mala utilización del vehículo, sobrecarga, competición, choque, accidente.',
  //     '         p)  Los servicios que el cliente haya concertado por su cuenta sin el previo consentimiento de Mapfre Assistance.',
  //     '         q)  Los servicios adicionales que el cliente haya contratado directamente bajo su cuenta y riesgo.',
  //     '         r)  Los gastos de estacionamientos y/o de garaje, así como toda la indemnización por inmovilización, lucro cesante y daño emergente o',
  //     '             perjuicio consecuencial.',
  //     '         s)  No cubre obligaciones legales del fabricante, distribuidor, vendedor o cualquier otra persona y/o entidad, que emanen de la',
  //     '             legislación o reglamentación nacional, en términos de responsabilidad contractual, civil o criminal.',
  //     '',
  //     'Mapfre Assistance queda relevada de responsabilidad cuando el neumático a reemplazar no se encuentre disponible en el concesionario',
  //     'donde ha sido derivado el cliente.',
  //     '',
  //     'La compañía queda relevada de responsabilidad cuando por causa de fuerza mayor le sea imposible prestar las acciones de asistencia',
  //     'descritas anteriormente, sin perjuicio de las indemnizaciones a que hubiere lugar, las que se pagarán contra presentación de los comprobantes',
  //     'de gastos originales respectivos que presente el cliente y hasta la concurrencia de los límites que se estipulan.',
  //   ],
  //   font: helveticaFont,
  //   alignment: 'left',
  //   y: PAGE_HEIGHT - 280,
  // });

  // // -------------------------- Page 4 --------------------------

  // addSeparatorRectangle({
  //   page: page4,
  //   text: 'PROCEDIMIENTO OPERATIVO DE LAS ASISTENCIAS',
  //   alignment: 'left',
  //   font: helveticaBoldFont,
  //   backgroundColor: rgb(1, 1, 1),
  //   borderWidth: 0.5,
  //   x: PAGE_BORDER,
  //   y: PAGE_HEIGHT - 90,
  // });

  // drawMultilineText({
  //   page: page4,
  //   lines: [
  //     'Cuando se produzca algún hecho que pueda dar origen a alguna de las asistencias descritas, el cliente deberá comunicarse vía telefónica al',
  //     'número +56 2 2707 4555, desde una línea fija o celular, indicando su número de Rut, Nombre, Placa Patente del vehículo cubierto, número de',
  //     'Chasis, lugar donde se encuentra, número de teléfono de contacto, tipo de servicio que se requiere y todo antecedente que le sea requerido',
  //     'para la adecuada prestación del servicio de asistencia.',
  //     'Las coberturas corresponden a beneficios anuales y topes anuales, los cuales al término de un año, expirarán y al comienzo de un nuevo año',
  //     'el cliente comenzará con nuevos beneficios anuales.',
  //   ],
  //   font: helveticaFont,
  //   alignment: 'left',
  //   y: PAGE_HEIGHT - 120,
  // });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
};