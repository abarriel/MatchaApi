import debug from 'debug';
import { Err } from '../modules/error';
import { generateLoginToken } from './generateLoginToken';
import * as parse from './dispatchParsersAuth';
import * as prepare from './prepareQueries';

const logger = debug('matcha:auth/dispatchingQueriesAuth.js:');

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
    // req.dUsers
    //   .update({ email: req.body.email },
    //   { $set: { password:  }})
  })
  .catch((err) => { logger(err); });
  return next();
};
