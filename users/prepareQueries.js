import debug from 'debug';
import { sendMail } from '../modules/mail';
import { cryptPassword } from '../modules/password';

const logger = debug('matcha:prepareQueryRegister.js');

export const prepareQueryRegister = (req) => {
  const token = Math.random().toString(36).substr(2, 6).toUpperCase();
  cryptPassword(req.body.password)
  .then(((pass) => {
    req.body.password = pass;
    req.dUsers
    .insert(Object.assign(
      req.body,
      { registerToken: token }))
    .catch(() => { logger('insert failed'); });
  }))
  .then(() => {
    sendMail(req.body.email, 'Registration - Matcha', `Registration Code: ${token}`);
  })
  .catch(() => { logger('password error'); });
};
export const prepareQuerLogin = (req, res) => {
  logger(res);
};
