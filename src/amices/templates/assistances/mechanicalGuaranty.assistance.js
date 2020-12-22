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
  const { contract, vehicle, customer } = args || {};
  const pdfDoc = await PDFDocument.create();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = await generatePages({ pdfDoc, amount: 5, helveticaFont, helveticaBoldFont });
  const headerCellSpace = (PAGE_WIDTH - PAGE_BORDER * 2 - 3 * CELL_WIDTH) / 2;
  const vehicleCellWidth = (PAGE_WIDTH - PAGE_BORDER * 2) / 4;
  const clientDataWidth = (PAGE_WIDTH - 2 * PAGE_BORDER) / 3;
  const [page, page2, page3, page4, page5] = pages;

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

  if (vehicle && vehicle.plateNumber) {
    page.drawText(String(vehicle.plateNumber), {
      x: 138,
      y: 630,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (vehicle && vehicle.chasisNumber) {
    page.drawText(String(vehicle.chasisNumber), {
      x: 338,
      y: 630,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (vehicle && vehicle.carBrand) {
    page.drawText(String(vehicle.carBrand), {
      x: PAGE_BORDER + 3,
      y: 590,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (vehicle && vehicle.carModel) {
    page.drawText(String(vehicle.carModel), {
      x: PAGE_BORDER + vehicleCellWidth + 3,
      y: 590,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (vehicle && vehicle.carYear) {
    page.drawText(String(vehicle.carYear), {
      x: PAGE_BORDER + 2 * vehicleCellWidth + 3,
      y: 590,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    });
  }

  if (vehicle && vehicle.carMileage) {
    page.drawText(String(vehicle.carMileage), {
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
  const rightBorder = leftBorder + containerWidth;

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

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 345,
    width: 2 * containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });

  const gearBoxTitle = 'CAJA DE CAMBIOS';
  textWidth = helveticaFont.widthOfTextAtSize(gearBoxTitle, FONT_SIZE);
  textX = PAGE_WIDTH / 2 - textWidth / 2;

  page3.drawText(gearBoxTitle, {
    x: textX,
    y: PAGE_HEIGHT - 340,
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
    x: rightBorder,
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
    x: rightBorder,
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
    x: rightBorder,
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
    x: rightBorder,
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
    x: rightBorder,
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
    x: rightBorder,
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
    x: rightBorder,
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
    x: rightBorder,
    y: PAGE_HEIGHT - 315,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 330,
    width: containerWidth * 2,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawText('CORONA DE VOLANTE', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 206,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('VOLANTE', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 220,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('CIGÜEÑAL', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 235,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('ARBOLES DE LEVAS, IMPULSADORES, ELEVADORES', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 250,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('CONJUNTO DE EJE DE BALANCINES', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 265,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('VÁLVULAS Y GUÍAS', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 280,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('MÚLTIPLES DE ADMISIÓN', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 295,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('MÚLTIPLE DE ESCAPE', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 310,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('ENGRANAJES', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 325,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('RESORTES DE VÁLVULAS', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 206,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('CADENA DE TRANSMISIÓN', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 220,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('TORNILLO RETENEDOR POLEA DE CIGÜEÑAL', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 235,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('BASE FILTRO DE ACEITE', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 250,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('BARRA Y TUBO MEDIDORES DE ACEITE', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 265,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('RODAMIENTOS INTERNOS', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 280,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('CASQUETES DE CIGÜEÑAL', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 295,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('POLEA CIGÜEÑAL', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 310,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // -------------- GearBox

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 360,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 360,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 375,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 375,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 390,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 390,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 405,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 405,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 420,
    width: containerWidth * 2,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  // ------------------->

  page3.drawText('ENGRANAJES', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 355,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('DESPLAZABLES Y ANILLOS DE SINCRONIZACIÓN', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 370,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('SELECTORES', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 385,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('ARBOLES', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 400,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('ANTE/POSTE BOMBA (MANUAL/ELECTRICO) DE LA BOMBA', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 415,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('CONVERTIDOR DE PAR', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 355,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('VÁLVULA MODULADORA', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 370,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('BARRA Y TUBO MEDIDORES DE ACEITE', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 385,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('COJINETES Y RODAMIENTOS', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 400,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // -------------- Differential and Transmission
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 435,
    width: 2 * containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });

  const differencialAndTransmissionTitle = 'DIFERENCIAL Y TRANSMISIÓN';
  textWidth = helveticaFont.widthOfTextAtSize(differencialAndTransmissionTitle, FONT_SIZE);
  textX = PAGE_WIDTH / 2 - textWidth / 2;

  page3.drawText(differencialAndTransmissionTitle, {
    x: textX,
    y: PAGE_HEIGHT - 430,
    color: rgb(1, 1, 1, 1),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 450,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 450,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 465,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 465,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 480,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 480,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 495,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 495,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  // ------------------->

  page3.drawText('GRUPO CÓNICO', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 445,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('SELECTORES DE DOBLE MARCHA', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 460,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('GRUPO DE TRANSFERENCIA', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 475,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('LIMITADORES DE DESLIZAMIENTO', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 490,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('SATÉLITES', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 445,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('CORONA', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 460,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('JUNTAS UNIVERSALES', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 475,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // -------------- Braking System
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 510,
    width: 2 * containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });

  const brakingSystemTitle = 'SISTEMA DE FRENOS';
  textWidth = helveticaFont.widthOfTextAtSize(brakingSystemTitle, FONT_SIZE);
  textX = PAGE_WIDTH / 2 - textWidth / 2;

  page3.drawText(brakingSystemTitle, {
    x: textX,
    y: PAGE_HEIGHT - 505,
    color: rgb(1, 1, 1, 1),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 525,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 525,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawText('BOMBA PRINCIPAL, BOMBINES Y SERVOFRENO', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 520,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('LIMITADORES DE PRESIÓN Y COMPENSADORES DE FRENADA', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 520,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // -------------- Direction
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 540,
    width: 2 * containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });

  const directionTitle = 'DIRECCIÓN';
  textWidth = helveticaFont.widthOfTextAtSize(directionTitle, FONT_SIZE);
  textX = PAGE_WIDTH / 2 - textWidth / 2;

  page3.drawText(directionTitle, {
    x: textX,
    y: PAGE_HEIGHT - 535,
    color: rgb(1, 1, 1, 1),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 555,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 555,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 570,
    width: containerWidth * 2,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawText('CREMALLERA Y SINFÍN', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 550,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('BIELA DE DIRECCIÓN', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 550,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('UNIDAD DE SERVODIRECCIÓN Y BOMBA', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 565,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // -------------- Front and rear suspension
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 585,
    width: 2 * containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });

  const frontAndRearSuspension = 'SUSPENSIÓN DELANTERA Y TRASERA';
  textWidth = helveticaFont.widthOfTextAtSize(frontAndRearSuspension, FONT_SIZE);
  textX = PAGE_WIDTH / 2 - textWidth / 2;

  page3.drawText(frontAndRearSuspension, {
    x: textX,
    y: PAGE_HEIGHT - 580,
    color: rgb(1, 1, 1, 1),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 600,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 600,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawText('BRAZOS DE TORSIÓN', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 595,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('BRAZOS DE SUSPENSIÓN SUPERIORES E INFERIORES', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 595,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // -------------- Refrigeration System
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 615,
    width: 2 * containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });

  const refrigerationSystem = 'SISTEMA DE REFRIGERACIÓN';
  textWidth = helveticaFont.widthOfTextAtSize(refrigerationSystem, FONT_SIZE);
  textX = PAGE_WIDTH / 2 - textWidth / 2;

  page3.drawText(refrigerationSystem, {
    x: textX,
    y: PAGE_HEIGHT - 610,
    color: rgb(1, 1, 1, 1),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 630,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 630,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawText('BOMBA DE AGUA', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 625,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('TERMOSTATO', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 625,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // -------------- Feeding System
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 645,
    width: 2 * containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });

  const feedingSystem = 'SISTEMA DE ALIMENTACIÓN';
  textWidth = helveticaFont.widthOfTextAtSize(feedingSystem, FONT_SIZE);
  textX = PAGE_WIDTH / 2 - textWidth / 2;

  page3.drawText(feedingSystem, {
    x: textX,
    y: PAGE_HEIGHT - 640,
    color: rgb(1, 1, 1, 1),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 660,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 660,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 675,
    width: containerWidth * 2,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawText('BOMBA DE COMBUSTIBLE', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 655,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('BOMBA ELÉCTRICA DE ALIMENTACIÓN', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 655,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('BOMBA DE INYECCIÓN', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 670,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // -------------- Electrical System
  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 690,
    width: 2 * containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });

  const electricalSystem = 'SISTEMA ELÉCTRICO';
  textWidth = helveticaFont.widthOfTextAtSize(electricalSystem, FONT_SIZE);
  textX = PAGE_WIDTH / 2 - textWidth / 2;

  page3.drawText(electricalSystem, {
    x: textX,
    y: PAGE_HEIGHT - 685,
    color: rgb(1, 1, 1, 1),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 705,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 705,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 720,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 720,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 735,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: rightBorder,
    y: PAGE_HEIGHT - 735,
    width: containerWidth,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawRectangle({
    x: leftBorder,
    y: PAGE_HEIGHT - 750,
    width: containerWidth * 2,
    height: 15,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page3.drawText('ALTERNADOR', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 700,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('REGULADOR DE TENSIÓN', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 700,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('RODAMIENTO INTERNO', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 715,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('SOLENOIDE DE ARRANQUE', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 715,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('ESCOBILLAS', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 730,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('MOTOR LIMPIAPARABRISA', {
    x: rightBorder + 2,
    y: PAGE_HEIGHT - 730,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page3.drawText('MOTOR DE ARRANQUE', {
    x: leftBorder + 2,
    y: PAGE_HEIGHT - 745,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // // -------------------------- Page 4 --------------------------

  addSeparatorRectangle({
    page: page4,
    text: 'CONDICIONES PARTICULARES',
    alignment: 'left',
    font: helveticaBoldFont,
    backgroundColor: rgb(1, 1, 1),
    borderWidth: 0.5,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 100,
  });

  page4.drawText('DEDUCIBLE O COPAGO', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 120,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  drawMultilineText({
    page: page4,
    lines: [
      'El cliente, al momento de aceptar la reparación y/o sustitución de la pieza de repuesto, deberá pagar al prestador del servicio un deducible',
      'correspondiente al UF 3 IVA incluido, por cada evento.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 130,
  });

  page4.drawText('NÚMERO DE EVENTOS', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 160,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page4.drawText('Máximo un (1) evento anual durante la cobertura.', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 170,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('LIMITE ECONÓMICO', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 190,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  drawMultilineText({
    page: page4,
    lines: [
      'El plan considera un límite económico de $1.200.000 (Un millón doscientos mil pesos chilenos) por vehículo anual durante el período de',
      'vigencia.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 200,
  });

  page4.drawText('OBLIGACIONES MAPFRE ASSISTANCE', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 230,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  drawMultilineText({
    page: page4,
    lines: [
      'El prestador del servicio, se obliga a prestar los servicios del plan de GARANTÍA MECANICA contemplados en el presente contrato,',
      'directamente o a través de sus proveedores o centros de servicio autorizados. Los servicios a prestar son los siguientes:',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 240,
  });

  page4.drawText('        1.    Reposición y/o arreglo de piezas cubiertas:', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 260,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  drawMultilineText({
    page: page4,
    lines: [
      '               El prestador del servicio se hace cargo de los costos de mano de obra, reposición y/o arreglo de piezas o partes de ellas, originados',
      '               por daños o averías mecánicas, eléctricas en las que se vea(n) directamente comprometida(s) la(s) pieza(s) cubierta(s) según detalle.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 270,
  });

  page4.drawText('        2.    Mano de obra:', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 290,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  drawMultilineText({
    page: page4,
    lines: [
      '               El prestador del servicio se hace cargo del costo por mano de obra requerida como consecuencia de daño o avería mecánica,',
      '               eléctrica en la que se vea(n) directamente comprometida(s) la(s) pieza(s) cubierta(s) según lo detallado. Se privilegiará taller',
      '               multimarca para la evaluación y reparación del vehículo cuando corresponda.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 300,
  });

  page4.drawText('PLAN DE INSPECCIÓN Y MANTENIMIENTO', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 340,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  drawMultilineText({
    page: page4,
    lines: [
      'Durante el período de cobertura, el vehículo cubierto deberá someterse a controles de mantenimiento preventivo según lo especificado en la',
      'tabla de mantenimiento preventivo obligatorio, en un taller de mecánica dotado de los medios técnicos y tecnológicos actualizados y',
      'suficientes, debiendo conservar la factura detallada del servicio, la cual será requerida en caso de solicitud de servicio de GARANTÍA',
      'MECÁNICA. Los costos por los mantenimientos estarán a cargo del propietario del vehículo cubierto.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 350,
  });

  addUnderlineText({
    page: page4,
    text: 'Tabla de Mantenimiento Preventivo Obligatorio',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 400,
  });

  page4.drawText(
    'Los mantenimientos detallados a continuación son de exclusiva responsabilidad y costo del cliente/propietario del vehículo cubierto.',
    {
      x: PAGE_BORDER,
      y: PAGE_HEIGHT - 410,
      color: rgb(0, 0, 0, 0),
      size: FONT_SIZE,
      font: helveticaFont,
    },
  );

  page4.drawText('a.    Cada 5.000 (cinco mil) kilómetros y/o cuando menos una vez al año', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 430,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  const smallContainer = 150;
  let smallBorder = PAGE_BORDER + 20;
  const bigRightContainer = PAGE_WIDTH - smallContainer - smallBorder * 2;
  const bigRightContainerHeight = 13.3;
  const smallRightBorder = smallBorder + smallContainer;

  // -------------- VACIADO / LLENADO A
  page4.drawRectangle({
    x: smallBorder,
    y: PAGE_HEIGHT - 480,
    width: smallContainer,
    height: 40,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  const emptiedFilledText = 'VACIADO / LLENADO';
  textWidth = helveticaFont.widthOfTextAtSize(emptiedFilledText, FONT_SIZE);
  textX = smallContainer / 2 - textWidth / 2;

  page4.drawText(emptiedFilledText, {
    x: smallBorder + textX,
    y: PAGE_HEIGHT - 465,
    color: rgb(0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page4.drawRectangle({
    x: smallBorder,
    y: PAGE_HEIGHT - 520,
    width: smallContainer,
    height: 40,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  const verificationText = 'VERIFICACIÓN / RECAMBIO O';
  textWidth = helveticaFont.widthOfTextAtSize(verificationText, FONT_SIZE);
  textX = smallContainer / 2 - textWidth / 2;

  page4.drawText(verificationText, {
    x: smallBorder + textX,
    y: PAGE_HEIGHT - 498,
    color: rgb(0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  const repositionText = 'REPOSICIÓN';
  textWidth = helveticaFont.widthOfTextAtSize(repositionText, FONT_SIZE);
  textX = smallContainer / 2 - textWidth / 2;

  page4.drawText(repositionText, {
    x: smallBorder + textX,
    y: PAGE_HEIGHT - 508,
    color: rgb(0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  let baseY = 440;

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 2),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 3),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 4),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 5),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 6),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawText('Sustitución de aceite de motor', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Sustitución de filtro de aceite', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 2 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Sustitución de gasolina (opcional)', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 3 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Niveles de refrigeración o agua', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 4 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Líquido de frenos', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 5 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Líquido de dirección servo asistida', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 6 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('b.    Cada 10.000 (diez mil) kilómetros y/o cuando sea necesario', {
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 540,
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // -------------- VACIADO / LLENADO B
  page4.drawRectangle({
    x: smallBorder,
    y: PAGE_HEIGHT - 590,
    width: smallContainer,
    height: 40,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  const emptiedFilledTextB = 'VACIADO / LLENADO';
  textWidth = helveticaFont.widthOfTextAtSize(emptiedFilledTextB, FONT_SIZE);
  textX = smallContainer / 2 - textWidth / 2;

  page4.drawText(emptiedFilledTextB, {
    x: smallBorder + textX,
    y: PAGE_HEIGHT - 575,
    color: rgb(0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page4.drawRectangle({
    x: smallBorder,
    y: PAGE_HEIGHT - 656.5,
    width: smallContainer,
    height: 66.5,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  const verificationTextB = 'VERIFICACIÓN / RECAMBIO O';
  textWidth = helveticaFont.widthOfTextAtSize(verificationTextB, FONT_SIZE);
  textX = smallContainer / 2 - textWidth / 2;

  page4.drawText(verificationTextB, {
    x: smallBorder + textX,
    y: PAGE_HEIGHT - 618,
    color: rgb(0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  const repositionTextB = 'REPOSICIÓN';
  textWidth = helveticaFont.widthOfTextAtSize(repositionTextB, FONT_SIZE);
  textX = smallContainer / 2 - textWidth / 2;

  page4.drawText(repositionTextB, {
    x: smallBorder + textX,
    y: PAGE_HEIGHT - 628,
    color: rgb(0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  baseY = 550;

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 2),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 3),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 4),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 5),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 6),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 7),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 8),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 9),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 10),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 11),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 12),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 13),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 14),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page4.drawText('Cambiar aceite de caja y transmisión al menos cada 40.000 (cuarenta mil) kilometros', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Cambiar empaque (tapón carter)', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 2 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Desmontar, limpiar y colocar la chapa de protección al motor', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 3 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Niveles de fluido del circuito de alimentación del motor', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 4 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Niveles de fluido de la caja de cambios y puente', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 5 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Niveles de fluido del circuito de frenos', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 6 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Niveles de fluido del circuito de refrigeración', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 7 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Funcionamiento de batería', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 8 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Líquido de frenos', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 9 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Líquido de circuito de refrigeración', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 10 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Líquido de dirección servo asistida', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 11 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Líquido Limpiaparabrisas', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 12 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Filtro de aire', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 13 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page4.drawText('Filtro de gasolina', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 14 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  // -------------- complete fluid levels
  page4.drawRectangle({
    x: smallBorder,
    y: PAGE_HEIGHT - 709.7,
    width: smallContainer,
    height: 53.5,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  const completeFluidLevels = 'COMPLETAR NIVELES DE FLUIDO';
  textWidth = helveticaFont.widthOfTextAtSize(completeFluidLevels, FONT_SIZE);
  textX = smallContainer / 2 - textWidth / 2;

  page4.drawText(completeFluidLevels, {
    x: smallBorder + textX,
    y: PAGE_HEIGHT - 685,
    color: rgb(0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  // -------------- clean / replace
  page4.drawRectangle({
    x: smallBorder,
    y: PAGE_HEIGHT - 736.2,
    width: smallContainer,
    height: 26.7,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  const cleanReplaceTitle = 'LIMPIAR/ REEMPLAZAR';
  textWidth = helveticaFont.widthOfTextAtSize(cleanReplaceTitle, FONT_SIZE);
  textX = smallContainer / 2 - textWidth / 2;

  page4.drawText(cleanReplaceTitle, {
    x: smallBorder + textX,
    y: PAGE_HEIGHT - 725,
    color: rgb(0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  // // -------------------------- Page 5 --------------------------

  page5.drawRectangle({
    x: smallBorder,
    y: PAGE_HEIGHT - 125,
    width: smallContainer,
    height: 40,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  const controlSettingsTitle = 'CONTROL REGLAJES';
  textWidth = helveticaFont.widthOfTextAtSize(controlSettingsTitle, FONT_SIZE);
  textX = smallContainer / 2 - textWidth / 2;

  page5.drawText(controlSettingsTitle, {
    x: smallBorder + textX,
    y: PAGE_HEIGHT - 108,
    color: rgb(0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  page5.drawRectangle({
    x: smallBorder,
    y: PAGE_HEIGHT - 164.8,
    width: smallContainer,
    height: 39.9,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  const strapsTitle = 'CORREAS';
  textWidth = helveticaFont.widthOfTextAtSize(strapsTitle, FONT_SIZE);
  textX = smallContainer / 2 - textWidth / 2;

  page5.drawText(strapsTitle, {
    x: smallBorder + textX,
    y: PAGE_HEIGHT - 148,
    color: rgb(0, 0, 0),
    size: FONT_SIZE,
    font: helveticaBoldFont,
  });

  baseY = 85;

  page5.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page5.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 2),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page5.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 3),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page5.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 4),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page5.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 5),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page5.drawRectangle({
    x: smallRightBorder,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 6),
    width: bigRightContainer,
    height: bigRightContainerHeight,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  page5.drawText('Controlar el estado de pastillas y bandas', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page5.drawText('Verificar estado de discos', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 2 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page5.drawText('Control de desgaste y rotación de neumáticos', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 3 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page5.drawText('Control de estado general de las correas', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 4 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page5.drawText('Control de tensión', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 5 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  page5.drawText('Repartición cada 50.000 kilometros', {
    x: smallRightBorder + 2,
    y: PAGE_HEIGHT - (baseY + bigRightContainerHeight * 6 - 3),
    color: rgb(0, 0, 0, 0),
    size: FONT_SIZE,
    font: helveticaFont,
  });

  drawMultilineText({
    page: page5,
    lines: [
      'El no cumplimiento de lo estipulado en el Plan de Inspección y Mantenimiento, exime al prestador del servicio de toda responsabilidad a',
      'cubrir los daños y/o averías presentadas. Las inspecciones y mantenimientos deberán llevarse a cabo con un margen de hasta un (1)',
      'año o 5.000 (cinco mil) kilómetros a partir de la fecha de venta o de la inspección o mantenimiento anterior. Es responsabilidad del',
      'cliente contar con la documentación de las mantenciones realizadas al vehículo antes de la fecha de compra o en su defecto contar con',
      'un documento de inspección o chequeo de un taller de mecánica autorizado, dotado de los medios técnicos y tecnológicos actualizados',
      'y suficientes, que acredite que las mantenciones fueron realizadas a conformidad.',
    ],
    font: helveticaFont,
    alignment: 'left',
    x: smallBorder,
    y: PAGE_HEIGHT - 180,
  });

  addSeparatorRectangle({
    page: page5,
    text: 'EXCLUSIONES',
    alignment: 'left',
    font: helveticaBoldFont,
    backgroundColor: rgb(1, 1, 1),
    borderWidth: 0.5,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 260,
  });

  smallBorder = PAGE_BORDER + 10;

  drawMultilineText({
    page: page5,
    lines: [
      'Mapfre Assistance no se hace parte del objeto de este contrato y por lo tanto no habrá lugar a la prestación del Servicio de GARANTIA',
      'MECÁNICA en los siguientes casos:',
      '',
      'a)   La sustitución, reparación o ajuste de piezas y/o repuestos ocasionados en o por:',
      '         •     El desgaste debido al uso normal del vehículo cubierto incluyendo, pero no limitado a: correas, amortiguadores, embrague,',
      '               control y ajuste del tren delantero, pastillas y zapatas de freno, discos, batería, etc.',
      '         •     Defectos de fabricación o montaje reconocidos por el fabricante del vehículo.',
      '         •     Las bujías del encendido, catalizadores, filtro de aire, de aceite, o carburante, escobillas limpiaparabrisas, sustancias de',
      '               llenado del sistema de aire acondicionado, los añadidos de lubricantes, refrigerantes, líquidos de frenos, y otros aditivos,',
      '               excepto cuando su pérdida haya sido consecuencia directa de una avería mecánica cubierta por el presente certificado.',
      '         •     Defectos o fallas en carrocería, tapizados, neumáticos, llantas, batería, faros, fusibles, así como la rotura o fisura de lunas o',
      '               faros.',
      'b)   Piezas y componentes Electrónicos.',
      'c)   Fallas preexistente al momento de entrada en vigencia de la cobertura.',
      'd)   Los gastos de mantenimiento normal de la carrocería y habitáculo, incluida la limpieza y reparación de decoraciones de los asientos,',
      '      bolsas portapapeles, tapizado, apoya cabezas, cuero o tela de asientos.',
    ],
    font: helveticaFont,
    alignment: 'left',
    x: smallBorder,
    y: PAGE_HEIGHT - 280,
  });

  return pdfDoc.saveAsBase64();
};
