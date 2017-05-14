import { MongoClient } from 'mongodb';
import debug from 'debug';

const logger = debug('matcha:mongo.js');

export const Connect = (req, res, next) => {
  MongoClient.connect('mongodb://localhost/matcha', (err, db) => {
    if (err) next(err);
    logger('Mongo:Connect');
    req.db = db;
    return next();
  });
};

export const Disconnect = (req, res, next) => {
  logger('Mongo:Disconnect');
  req.db.close();
  return next();
};

export const Error = (req, res, next, err) => {
  if (err) res.send({ status: 'error' });
  logger('Mongo:Error');
};
