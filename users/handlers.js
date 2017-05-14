import debug from 'debug';
import * as parse from './parsers';

const logger = debug('matcha:users/handlers.js:');

export const register = (req, res, next) => {
  const errorParser = parse.register(req.body);
  if (errorParser) throw errorParser;
  delete req.body.repassword;
  const foundUsers = req.dUsers.findOne(
    {
      $or: [{ login: req.body.login }, { email: req.body.email }],
    });
  logger(foundUsers);
  res.send();
  return next();
};

export const login = () => {
  logger('Login Objects');
};
