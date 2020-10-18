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

module.exports = async () => {
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

  page.drawText('"REPARACIONES MENORES + ROBO CONTENIDO" AMICAR', {
    x: 100,
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

  addSeparatorRectangle({
    page,
    text: 'ANTECEDENTES DEL CONTRATANTE',
    font: helveticaBoldFont,
    backgroundColor: rgb(0.85, 0.85, 0.85),
    y: 590,
  });

  addSingleCell({
    page,
    text: 'NOMBRE',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: PAGE_WIDTH - 2 * PAGE_BORDER,
    textX: PAGE_BORDER + 5,
    x: PAGE_BORDER,
    y: 555,
    alignment: 'start',
  });

  addSingleCell({
    page,
    text: 'RUT',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: clientDataWidth,
    x: PAGE_BORDER,
    y: 521,
  });

  addSingleCell({
    page,
    text: 'DIRECCIÓN',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: PAGE_WIDTH - 2 * PAGE_BORDER,
    textX: PAGE_BORDER + 5,
    x: PAGE_BORDER,
    y: 487,
    alignment: 'start',
  });

  page.drawText('(Calle, Número, Departamento/Block, Comuna)', {
    x: PAGE_BORDER + 54,
    y: 492,
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
    y: 453,
  });

  addSingleCell({
    page,
    text: 'TELÉFONO',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: clientDataWidth,
    x: PAGE_BORDER + clientDataWidth,
    y: 453,
  });

  addSingleCell({
    page,
    text: 'CELULAR',
    titleColor: rgb(0.85, 0.85, 0.85),
    font: helveticaBoldFont,
    width: clientDataWidth,
    x: PAGE_BORDER + 2 * clientDataWidth,
    y: 453,
  });

  addSeparatorRectangle({
    page,
    text: 'ACEPTACIÓN DE CONDICIONES',
    font: helveticaBoldFont,
    backgroundColor: rgb(0.85, 0.85, 0.85),
    y: 405,
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
    y: 380,
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

  // -------------------------- Page 2 --------------------------

  addSeparatorRectangle({
    page: page2,
    text: 'CONDICIONES GENERALES',
    alignment: 'left',
    font: helveticaBoldFont,
    backgroundColor: rgb(1, 1, 1),
    borderWidth: 0.5,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 90,
  });

  addUnderlineText({
    page: page2,
    text: 'Vehículo Cubierto',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 110,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'Se entenderá por vehículo cubierto al que aparezca identificado en la información aportada por AMICAR. La cobertura se otorga',
      'exclusivamente a dicho vehículo.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 125,
  });

  addUnderlineText({
    page: page2,
    text: 'Ámbito Territorial Asistencia',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 160,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'Ciudades de Chile donde aplican las coberturas de Reparaciones de Desperfectos Menores: Arica, Iquique, Antofagasta, Calama, Copiapó, La',
      'Serena, Coquimbo, Valparaíso, Viña del Mar, San Antonio, Santiago, Rancagua, San Fernando, Curicó, Talca, Chillán, Concepción,',
      'Talcahuano, Los Ángeles, Valdivia, Temuco, Osorno, Puerto Montt y Punta Arenas.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 175,
  });

  addSeparatorRectangle({
    page: page2,
    text: 'DETALLE DE LAS COBERTURAS DE ASISTENCIA',
    alignment: 'left',
    font: helveticaBoldFont,
    backgroundColor: rgb(1, 1, 1),
    borderWidth: 0.5,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 230,
  });

  addUnderlineText({
    page: page2,
    text: 'Reparaciones de Desperfectos Menores',
    font: helveticaBoldFont,
    fontSize: FONT_SIZE,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 255,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'En caso de que el cliente requiera reparar desperfectos menores en las áreas que se detallan a continuación, Sur Asistencia S.A. coordinará el',
      'ingreso a un taller especializado en las reparaciones que se detallan y cubrirá hasta los topes que se señalan:',
      '',
      '- Reparación de Raspones de Pintura de la Carrocería:',
      '  En caso de raspones de pintura (pintura de poliuretano, bicapa, metalizada) y que la magnitud del daño no sea superior a 21 cm x 28 cm,',
      '  Sur Asistencia S.A. derivará al cliente a un servicio especializado que realizará las labores de pintura de la zona con daño (según las',
      '  especificaciones indicadas anteriormente). Para todos los casos, la zona con daño no debe estar deformada.',
      '  Límite: UF 3,5 por evento y máximo 1 evento anual. Disponible en las principales ciudades de Chile.',
      '',
      '- Reparación de Piquetes y Trizaduras de Parabrisas:',
      '  En caso de piquete o trizadura del parabrisas, Sur Asistencia S.A. derivará al cliente a un servicio especializado que realizará las labores',
      '  de reparación del piquete o trizadura del parabrisas con daño. El daño (piquete) del parabrisas no debe sobrepasar el diámetro de una',
      '  moneda de $50 (2,5 cm) para poder ser reparado. Los piquetes causados por golpes de piedra con diámetros superiores a 2,5 cm,',
      '  dañarían la segunda lámina de vidrio (interna) y la lámina intermedia de plástico del parabrisas laminado, lo que imposibilitaría su',
      '  reparación y la restauración de la integridad de este. También se podrá reparar una sola línea continua de aproximadamente 30 cm.',
      '  Éstas deben ser recientes, de otra manera el polvo y la contaminación se va acumulando en la grieta imposibilitando su reparación.',
      '  Límite: UF 4 por evento y máximo 1 evento anual. Disponible en las principales ciudades de Chile.',
      '',
      '- Reparación de Piquetes y Rayones en Llantas:',
      '  En caso de daños superficiales en llantas de aluminio del vehículo producto de golpes por giros en esquinas, al momento de estacionar o',
      '  topar con el borde de una vereda, Sur Asistencia derivará al cliente a un servicio especializado que realizará las labores de restauración',
      '  de las llantas de aluminio del vehículo.',
      '  Límite: UF 2 por evento y máximo 1 evento anual. Disponible en las principales ciudades de Chile.',
      '',
      'Están excluidas las prestaciones y hechos siguientes:',
      'a)   No se encuentran cubiertos los desperfectos estéticos preexistentes a la vigencia de este contrato.',
      'b)   Desperfectos ocasionados a causa o como consecuencia de arreglos, reparaciones, modificaciones (tanto mecánicas como de',
      '      carrocería) o desarme de cualquier parte del vehículo cubierto.',
      'c)   Daños donde el cliente se niegue a autorizar al prestador del servicio al desmonte de las piezas a que tenga lugar a fin de reparar el',
      '      desperfecto estético presentado.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 280,
  });

  addSeparatorRectangle({
    page: page2,
    text: 'EXCLUSIONES GENERALES',
    alignment: 'left',
    font: helveticaBoldFont,
    backgroundColor: rgb(1, 1, 1),
    borderWidth: 0.5,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 610,
  });

  drawMultilineText({
    page: page2,
    lines: [
      'Están excluidas las prestaciones y hechos siguientes:',
      'a)   Los servicios que el cliente haya concertado por su cuenta, sin previo consentimiento de Mapfre Assistance., salvo que la comunicación',
      '      haya sido imposible por razón de fuerza mayor.',
      'b)   Los servicios adicionales que el cliente haya contratado directamente bajo su cuenta y riesgo.',
      'c)   Las asistencias derivadas de prácticas deportivas en competición.',
      'd)   Los gastos de estacionamientos y/o de garaje, así como toda la indemnización por inmovilización, lucro cesante y daño emergente o',
      '      perjuicio consecuencial.',
      'e)   Este producto es para todo vehículo de uso particular liviano, es decir, quedan excluidos: motos, camiones y vehículos de uso comercial',
      '      (como por ejemplo: leasing).',
      'La compañía queda relevada de responsabilidad cuando por causa de fuerza mayor le sea imposible prestar las acciones de asistencia',
      'descritas anteriormente, sin perjuicio de las indemnizaciones a que hubiere lugar, las que se pagarán contra presentación de los comprobantes',
      'de gastos originales respectivos que presente el cliente y hasta la concurrencia de los límites que se estipulan.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 630,
  });

  //  -------------------------- Page 3 --------------------------

  addSeparatorRectangle({
    page: page3,
    text: 'PROCEDIMIENTO OPERATIVO DE LAS ASISTENCIAS',
    alignment: 'left',
    font: helveticaBoldFont,
    backgroundColor: rgb(1, 1, 1),
    borderWidth: 0.5,
    x: PAGE_BORDER,
    y: PAGE_HEIGHT - 90,
  });

  drawMultilineText({
    page: page3,
    lines: [
      'Cuando se produzca algún hecho que pueda dar origen a alguna de las asistencias descritas, el cliente deberá comunicarse vía telefónica al',
      'número +56 2 2707 4555, desde una línea fija o celular, indicando su número de Rut, Nombre, Placa Patente del vehículo cubierto, número de',
      'Chasis, lugar donde se encuentra, número de teléfono de contacto, tipo de servicio que se requiere y todo antecedente que le sea requerido',
      'para la adecuada prestación del servicio de asistencia.',
      'Las coberturas corresponden a beneficios anuales y topes anuales, los cuales al término de un año, expirarán y al comienzo de un nuevo año',
      'el cliente comenzará con nuevos beneficios anuales.',
    ],
    font: helveticaFont,
    alignment: 'left',
    y: PAGE_HEIGHT - 110,
  });

  // // -------------------------- Page 4 --------------------------

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
};
