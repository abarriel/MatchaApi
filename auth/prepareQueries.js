import { sendMail } from '../modules/mail';
import { cryptPassword, comparePassword } from '../modules/password';
import { generateLoginToken } from './generateLoginToken';
import getAddress from './getAddress';
import _ from 'lodash';

export const Login = (password, data) =>
  new Promise((resolve, reject) => {
    comparePassword(password, data.password)
      .then((checkPass) => {
        if (checkPass !== true) {
          reject({ details: 'Wrong Password' });
        } else {
          const tokenAuthenticate = generateLoginToken(data);
          resolve(tokenAuthenticate);
        }
      })
      .catch(() => reject({ details: 'Failed - Something happens' }));
  });

export const Register = req =>
  new Promise((resolve, reject) => {
    const token = Math.random().toString(36).substr(2, 6).toUpperCase();
    cryptPassword(req.body.password)
      .then((pass) => {
        req.body.password = pass;
      })
      .then(() => getAddress(req))
      .then((data) => {
        const info = _.assign({}, req.body, data, { registerToken: token });
        req.dUsers
          .insert(info)
          .then(() => {
            sendMail(req.body.email, 'Registration - Matcha', `Registration Code: ${token}`);
            resolve();
          })
          .catch(() => {
            reject({ details: 'Insert failed' });
          });
      })
      .catch(() => {
        reject({ details: 'Failed - Something happens' });
      });
  });

export const ConfirmUserMail = req =>
  new Promise((resolve, reject) => {
    req.dUsers
      .findOne({ login: req.body.login })
      .then((data) => {
        if (!data) reject({ details: 'No Account Found' });
        if (data.registerToken !== req.body.token) reject({ details: 'Wrong Code' });
      })
      .then(() =>
        req.dUsers.update(
          { login: req.body.login },
          {
            $set: { confirmed: true },
            $unset: { registerToken: '' },
          },
        ),
      )
      .catch(() => reject({ details: 'Something happens will trying to connect!' }))
      .then(() => resolve({ details: 'Succesfully Confirmed' }));
  });
