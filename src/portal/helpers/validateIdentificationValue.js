const CHL = (value) => {
  const rut = String(value).replace(/[.]|[-]/g, '');
  function dv(T) {
    var M = 0,
      S = 1;
    for (; T; T = Math.floor(T / 10)) {
      S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    }
    return S ? S - 1 : 'k';
  }
  const producedDV = dv(rut.substr(0, rut.length - 1));
  const requestDV = rut.substr(-1).toLowerCase();
  return producedDV == requestDV;
};
const methods = {
  CHL,
};
module.exports = ({ value, country }) => {
  return methods[country](value);
};
