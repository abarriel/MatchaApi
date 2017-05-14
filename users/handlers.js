import debug from 'debug';
import * as parse from './parsers';

const logger = debug('matcha:users/handlers.js:');

const register = (req, res) => {
  const responseParser = parse.register(req.body);

  res.send(responseParser);
};

const login = () => {
  logger('Login Objects');
};

export { register, login };
