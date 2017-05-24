import debug from 'debug';
import { signToken } from '../modules/authToken';

const logger = debug('matcha:auth/dispatchingQueriesAuth.js:');

export const generateLoginToken = (data) => {
  const token = signToken({
    login: data.login,
    confirmed: data.confirmed,
  });
  return (token);
};


export const generateToken = (data) => {
  logger(data);
};
