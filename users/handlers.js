import debug from 'debug';
import * as parse from './parsers';

const logger = debug('matcha:users/handlers.js:');

const register = (req, res) => {
  if (!parse.register(req.body)) logger('Return 0');
  else {
    logger('Return 1');
  }
  // let info = req.body;
  // // logger(req.body);
  // // if()
  res.send();
};

const login = () => {
  logger('Login Objects');
};

export { register, login };
