import { MongoClient } from 'mongodb';
import debug from 'debug';

const logger = debug('matcha:mongo.js');

export const Connect = (req, res, next) => {
  MongoClient.connect('mongodb://localhost/matcha', (err, db) => {
    logger('Succes');
    req.db = db;
    return next();
  });
};

export const Disconnect = (req, res, next) => {
  req.db.close();
  return next();
};
