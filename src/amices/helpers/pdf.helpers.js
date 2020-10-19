const axios = require('axios');
const { rgb } = require('pdf-lib');

const AMICAR_LOGO_URL =
  'http://cdn.mcauto-images-production.sendgrid.net/b70730a2f5d03e36/8f326fca-91b1-474c-8103-4bec99708013/377x87.png';
const MAPFRE_LOGO_URL =
  'http://cdn.mcauto-images-production.sendgrid.net/b70730a2f5d03e36/8fe33014-526f-41fe-a808-05195ba22ae0/277x61.png';
const FONT_SIZE = 8;
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const PAGE_BORDER = 35;
const CELL_WIDTH = 125;
const CELL_HEIGHT = 17;

const addSingleCell = ({
  page,
  x,
  y,
  width = CELL_WIDTH,
  height = CELL_HEIGHT,
  titleColor = rgb(1, 1, 1),
  cellColor = rgb(1, 1, 1),
  borderWidth = 1,
  font,
  fontSize = FONT_SIZE,
  text = '',
  textX,
  textY = y + 5,
  alignment = 'center',
  content = '',
  contentX = x + 5,
  contentY = y - 5,
  contentFont,
  contentFontSize = FONT_SIZE,
}) => {
  page.drawRectangle({
    x,
    y,
    width,
    height,
    borderWidth,
    color: titleColor,
  });

  page.drawRectangle({
    x,
    y: y - height,
    width,
    height,
    borderWidth,
    color: cellColor,
  });

  if (alignment === 'center') {
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const textHeight = font.heightAtSize(fontSize);

    textX = x + width / 2 - textWidth / 2;
    textY = y + height / 2 - textHeight / 2;

    if (content) {
      const contentWidth = contentFont.widthOfTextAtSize(content, contentFontSize);
      const contentHeight = contentFont.heightAtSize(contentFontSize);

      contentX = x + width / 2 - contentWidth / 2;
      contentY = y - height / 2 - contentHeight / 2;
    }
  }

  page.drawText(text, {
    x: textX || x + 5,
    y: textY,
    size: fontSize,
    font,
  });

  if (!content) return;

  page.drawText(content, {
    x: contentX,
    y: contentY,
    size: contentFontSize,
    font: contentFont,
  });
};

const addSeparatorRectangle = ({
  page,
  x,
  y,
  height = CELL_HEIGHT,
  backgroundColor = rgb(1, 1, 1),
  font,
  fontSize = FONT_SIZE,
  text = '',
  borderWidth = 1,
  alignment = 'center',
  textX,
  textY = y + 5,
}) => {
  page.drawRectangle({
    x: PAGE_BORDER,
    y,
    width: PAGE_WIDTH - PAGE_BORDER * 2,
    height,
    borderWidth,
    color: backgroundColor,
  });

  if (alignment === 'center') {
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const textHeight = font.heightAtSize(fontSize);

    textX = PAGE_WIDTH / 2 - textWidth / 2;
    textY = y + height / 2 - textHeight / 2;
  }

  page.drawText(text, {
    x: textX || x + 5,
    y: textY,
    size: fontSize,
    font,
  });
};

const drawMultilineText = ({
  page,
  lines = [],
  font,
  fontSize = 8,
  lineHeight = 10,
  x = PAGE_BORDER,
  y,
  color,
  containerWidth = CELL_WIDTH,
  alignment = 'center',
}) => {
  for (let i = 0; i < lines.length; i += 1) {
    const text = typeof lines[i] === 'string' ? lines[i] : `${lines[i].title} ${lines[i].text}`;
    let textX = x;

    if (alignment === 'center') {
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      textX = x + containerWidth / 2 - textWidth / 2;
    }

    page.drawText(text, {
      x: textX,
      y: y - i * lineHeight,
      size: fontSize,
      font,
      color: color || rgb(0, 0, 0),
    });
  }
};

const addUnderlineText = ({ page, font, fontSize, text, x, y }) => {
  const textWidth = font.widthOfTextAtSize(text, fontSize);
  const textHeight = font.heightAtSize(fontSize) - 6;

  page.drawText(text, {
    x,
    y,
    size: fontSize,
    font,
  });

  page.drawLine({
    start: {
      x,
      y: y - textHeight,
    },
    end: {
      x: x + textWidth,
      y: y - textHeight,
    },
    thickness: 1,
    color: rgb(0, 0, 0),
  });
};

const drawSignatureLine = ({ page, start, end, text, font, fontSize = 8, x = PAGE_BORDER, y }) => {
  page.drawLine({
    start,
    end,
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  page.drawText(text, {
    x,
    y: y + 5,
    size: fontSize,
    font,
  });
};

const drawFooter = ({ page, helveticaFont, helveticaBoldFont, pageNumber }) => {
  page.drawRectangle({
    x: PAGE_BORDER + 72.64,
    y: 20,
    width: 90,
    height: 30,
    borderWidth: 0.5,
    color: rgb(0.65, 0.65, 0.65),
  });

  drawMultilineText({
    page,
    lines: ['En caso de requerir', 'asistencia, llame en forma', 'inmediata al siguiente', 'número:'],
    font: helveticaFont,
    fontSize: 6.5,
    alignment: 'center',
    lineHeight: 7,
    color: rgb(1, 1, 1),
    containerWidth: 90,
    x: PAGE_BORDER + 75,
    y: 43,
  });

  page.drawRectangle({
    x: PAGE_BORDER + 162.64,
    y: 20,
    width: 200,
    height: 30,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  drawMultilineText({
    page,
    lines: ['Fono Asistencia', '+56 2 – 2707 4555', 'Desde Linea Fija o Celulares'],
    font: helveticaBoldFont,
    fontSize: 6.5,
    lineHeight: 7,
    containerWidth: 200,
    x: PAGE_BORDER + 162.64,
    y: 40,
  });

  page.drawRectangle({
    x: PAGE_BORDER + 362.64,
    y: 20,
    width: 90,
    height: 30,
    borderWidth: 0.5,
    color: rgb(1, 1, 1),
  });

  drawMultilineText({
    page,
    lines: ['Atención las 24 horas,', 'los 365 días del año'],
    font: helveticaBoldFont,
    fontSize: 6.5,
    lineHeight: 7,
    containerWidth: 90,
    x: PAGE_BORDER + 362.64,
    y: 36,
  });

  page.drawText(pageNumber, {
    x: PAGE_WIDTH - PAGE_BORDER,
    y: 42,
    size: FONT_SIZE,
    font: helveticaBoldFont,
    color: rgb(0.87, 0.15, 0.06),
  });
};

const generatePages = async ({ pdfDoc, amount, helveticaFont, helveticaBoldFont }) => {
  const response = await axios.get(MAPFRE_LOGO_URL, { responseType: 'arraybuffer' });
  const amicarLogo = await pdfDoc.embedPng(response.data);
  const logoDims = amicarLogo.scale(0.6);
  const pages = [];

  for (let i = 0; i < amount; i += 1) {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

    page.drawImage(amicarLogo, {
      x: 20,
      y: 775,
      width: logoDims.width,
      height: logoDims.height,
    });

    drawFooter({ page, helveticaFont, helveticaBoldFont, pageNumber: String(i + 1) });
    pages.push(page);
  }

  return pages;
};

module.exports = {
  addSeparatorRectangle,
  addSingleCell,
  addUnderlineText,
  drawMultilineText,
  drawSignatureLine,
  generatePages,
};
