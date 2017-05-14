import { MongoClient } from 'mongodb';
import debug from 'debug';

const logger = debug('matcha:mongo.js');

const mongoConnect = () => new Promise((resolve, reject) => {
  MongoClient.connect('mongodb://localhost/matcha', (err, db) => {
    if (err) reject(err);
    logger('Succes');
    const cb = () => db.close();
    resolve({ db, cb });
  });
});

export default { mongoConnect };
