module.exports = ({ data, settingApproved }) => {
  const { percentage, months } = settingApproved;
  let approved = false;
  let approvedIndex = null;
  let someScenario = false;
  for (let index = 0; index < data.length; index += 1) {
    const { porcentaje: itemPercentage, mes: itemMonth, esEscenarioEstrella } = data[index];
    if (esEscenarioEstrella === true) someScenario = true;
    if (+percentage === +itemPercentage && +months === +itemMonth && esEscenarioEstrella === true) {
      approved = true;
      approvedIndex = index;
    }
  }
  return { approved, approvedIndex, someScenario };
};
