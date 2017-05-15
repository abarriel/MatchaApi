import debug from 'debug';

const logger = debug('matcha:register.js');

export const prepareQueryRegister = (body) => {
  logger(body);
};

export const prepareQuerLogin = (req, res) => {
  logger(req);
};
