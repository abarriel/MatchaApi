import debug from 'debug';
import { Err } from '../modules/error';
import { sendMail } from '../modules/mail';
import { cryptPassword } from '../modules/password';

const logger = debug('matcha:prepareQueryRegister.js');

export const QueryRegister = (req) => {
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
  logger('Succesfully Registered');
};

export const QueryLogin = (req, res) => {
  logger(res);
};

export const QueryConfirmUserMail = (req) => {
  req.dUsers
  .findOne({ login: req.body.login })
  .then((data) => { if (!data) throw Err('No Account Found! - confirmUserMail'); return data; })
  .then((data) => { if (data.registerToken !== req.body.token) throw Err('Wrong Token - confirmUserMail'); })
  .then(() => {
    req.dUsers
    .update(
      { login: req.body.login },
      { $set: { confirmed: true },
        $unset: { registerToken: '' },
      })
      .catch(() => { logger('Something happens will trying to connect!'); });
  })
  .catch(() => { logger('Wrong Token - confirmUserMail'); });
};
