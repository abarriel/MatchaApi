import debug from 'debug';
import * as parse from './parsers';

const logger = debug('matcha:users/handlers.js:');

const register = (req, res) => {
  const rep = parse.register(req.body);
  logger(rep);
  res.send();
};

const login = () => {
  logger('Login Objects');
};

export { register, login };
