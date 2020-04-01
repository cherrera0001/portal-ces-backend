import getCheckList from './getCheckList';

module.exports = {
  'chl/v1/checklist': [
    {
      method: 'get',
      authenticationRequired: true,
      path: '/',
      ctrl: getCheckList,
    },
  ],
};
