import debug from 'debug';
import * as parse from './parsers';
import { prepareQueryRegister } from './register';

const logger = debug('matcha:users/handlers.js:');
// Users already Register using the same Email and Login
export const register = (req, res, next) => {
  const errorParser = parse.register(req.body);
  if (errorParser) throw errorParser;
  delete req.body.repassword;
  req.dUsers
  .findOne({ $or: [{ login: 'req.body.login' }, { email: 'req.body.email' }] })
  .then((err) => { if (err) throw err; })
  .catch(() => { logger('users already Register using the same Email and Login'); })
  .then(prepareQueryRegister(req.body));
  res.send();
  return next();
};

export const login = () => {
  logger('Login Objects');
};
