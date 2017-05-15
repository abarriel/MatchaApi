import debug from 'debug';
import * as parse from './dispatchParsers';
import { prepareQueryRegister } from './prepareQueries';

const logger = debug('matcha:users/dispatchingQueries.js:');

export const register = (req, res, next) => {
  const errorParser = parse.register(req.body);
  if (errorParser) throw errorParser;
  delete req.body.repassword;
  req.dUsers
  .findOne({ $or: [{ login: 'req.body.login' }, { email: 'req.body.email' }] })
  .then((err) => { if (err) throw err; })
  .catch(() => { logger('user already register using the same Email/Login'); })
  .then(prepareQueryRegister(req.body));
  res.send();
  return next();
};

export const login = () => {
  logger('Login Objects');
};
