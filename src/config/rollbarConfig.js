import Rollbar from 'rollbar';

const { ROLLBAR_TOKEN, NODE_ENV } = process.env;

const singleton = (() => {
  let instance;

  function init() {
    const rollbar = new Rollbar({
      accessToken: ROLLBAR_TOKEN,
      environment: NODE_ENV,
    });
    return rollbar;
  }

  return {
    getInstance() {
      return instance || init();
    },
  };
})();

export default singleton.getInstance();
