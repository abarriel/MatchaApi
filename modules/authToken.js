import jwt from 'jsonwebtoken';
import debug from 'debug';

const secretSentence = 'MatcharS32z3LkMatchaAbarriel';
const logger = debug('matcha:./modules/tokens.js');

export const signToken = (info) => {
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3), // times x days eg : 3
    data: info,
  }, secretSentence);
  return token;
};

export const checkAuthenticate = (req, res, next) => {
  if (req.originalUrl.substr(0, 9) === '/api/auth') { next(); return; }
  // const token = req.body.token || req.query.token || req.headers['x-access-token'];
  const tokenBearer = req.headers.authorization;
  if (!tokenBearer || (tokenBearer.length < 7) || tokenBearer.substr(0, 7) !== 'Bearer ') {
    res.send('Token Error');
    logger('Wrong Authorization Provided');
    return;
  }
  const token = tokenBearer.substr(7);
  if (!token) {
    res.send('Token Error');
    logger('No token provide');
    return;
  }
  jwt.verify(token, secretSentence, (err, decoded) => {
    if (err) {
      res.send('Token Error');
      logger('Failed to authenticate token');
      return;
    }
    logger('Authorized');
    req.decoded = decoded;
    next();
  });
  next();
};
