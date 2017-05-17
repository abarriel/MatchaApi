import debug from 'debug';
import { signToken } from '../modules/tokens';

const logger = debug('matcha:auth/dispatchingQueriesAuth.js:');

export const generateLoginToken = (data) => {
  const token = signToken({
    login: data.login,
    confirmed: data.confirmed,
  });
  logger(token);
};


export const generateToken = (data) => {
  logger(data);
};
