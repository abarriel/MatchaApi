import debug from 'debug';
import jwt from 'jsonwebtoken';
import { Err } from '../modules/error';
import { generateLoginToken } from './generateLoginToken';
import { resetToken, secretSentence } from '../modules/authToken';
import { sendMail } from '../modules/mail';
import * as parse from './dispatchParsersAuth';
import * as prepare from './prepareQueries';

const logger = debug('matcha:auth/dispatchingQueriesAuth.js:');

export const checkAuthenticate = (req, res) => {
  res.send({ status: 'success' });
};

export const register = (req, res, next) => {
  const errorParser = parse.register(req.body);
  if (errorParser) {
    logger(errorParser);
    return next();
  }
  delete req.body.repassword;
  req.dUsers
  .findOne({ $or: [{ login: req.body.login }, { email: req.body.email }] })
  .then((data) => { if (data) throw Err('Already Registered'); })
  .then(() => prepare.QueryRegister(req))
  .catch((err) => { logger(err); });
  return next();
};

export const login = (req, res, next) => {
  const errorParser = parse.login(req.body);
  if (errorParser) {
    logger(errorParser);
    return next();
  }
  req.dUsers
  .findOne({ login: req.body.login })
  .then((data) => {
    if (!data) throw Err('No Account Found - login!');
    if (!data.confirmed) throw Err('Account not confirmed - login');
    return data;
  })
  .then((data) => { generateLoginToken(data); })
  .catch((err) => { logger(err); return next(); });
  return next();
};

export const confirmUserMail = (req, res, next) => {
  const errorParser = parse.confirmUserMail(req.body);
  if (errorParser) {
    logger(errorParser);
    return next();
  }
  req.dUsers
  .findOne({ login: req.body.login })
  .then((data) => { if (!data) throw Err('No Account Found! - confirm'); return data; })
  .then((data) => { if (data.confirmed) throw Err('Account Already Registered'); return data; })
  .then(() => { prepare.QueryConfirmUserMail(req); })
  .catch((err) => { logger(err); });
  return next();
};

export const resetPassword = (req, res, next) => {
  const errorParser = parse.resetPassword(req.body);
  if (errorParser) {
    logger(errorParser);
    return next();
  }
  req.dUsers
  .findOne({ email: req.body.email })
  .then((data) => { if (!data) throw Err('No Account Found - ResetPassword!'); })
  .then(() => {
    const token = resetToken(req.body.email);
    sendMail(req.body.email, 'Reset Password - Matcha', `Please Reset Your password following this link
    http://localhost:8080/api/auth/resetpassword?token=${token}`);
    logger('Email was been send');
  })
  .catch((err) => { logger(err); });
  return next();
};

// update check response demain si pas trouver il renvoi quoi ce fdp
// resetpassword en form c un password et un repeat password et le token
export const resetPasswordForm = (req, res, next) => {
  const errorParser = parse.resetPasswordForm(req.query);
  if (errorParser) {
    logger(errorParser);
    return next();
  }
  jwt.verify(req.query.token, secretSentence, (err, decoded) => {
    if (err) {
      logger('Failed to authenticate token');
      return;
    }
    logger('Authorized');
    req.decoded = decoded;
    logger(decoded);
    req.dUsers
      .findOne({ email: req.decoded.data })
      .then((data) => { if (!data) throw Err('No Account Found - ResetPassword!'); })
      .then(() => {
      // i dont know i have a get token but where can i send my form
      // req.dUsers
        // .update({ email: req.decoded.email }, { $set: })
      })
      .catch((er) => { logger(er); });
  });
  return next();
};
