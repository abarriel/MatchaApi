import debug from 'debug';
import * as parse from './parsers';

const logger = debug('matcha:users/handlers.js:');

const register = (req, res) => {
  parse.register(req.body);
  res.send();
};

const login = () => {
  logger('Login Objects');
};

export { register, login };
