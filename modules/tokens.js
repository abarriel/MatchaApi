import jwt from 'jsonwebtoken';
import debug from 'debug';

const secretSentence = 'MatcharS32z3LkMatchaAbarriel';
const logger = debug('matcha:./modules/tokens.js');

export const signToken = (info) => {
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: info,
  }, secretSentence);
  return token;
};

export const CompareToken = (info) => {
  logger(info);
};
