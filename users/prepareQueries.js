import debug from 'debug';
import { cryptPassword } from '../modules/password';

const logger = debug('matcha:prepareQueryRegister.js');

export const prepareQueryRegister = (req) => {
  cryptPassword(req.body.password)
  .then(((pass) => {
    req.body.password = pass;
    req.dUsers
    .insert(Object.assign(req.body, {pasword: 'd'}))
    .catch(() => { logger('insert failed'); });
  })).catch(() => { logger('password error'); });
};
export const prepareQuerLogin = (req, res) => {
  logger(res);
};
