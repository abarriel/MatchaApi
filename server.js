import bodyParser from 'body-parser';
import http from 'http';
import express from 'express';
import debug from 'debug';
import cors from 'cors';
import auth from './routes/auth';
import * as mongo from './config/mongo';

const logger = debug('matcha:server.js:');
const app = express();
const server = http.createServer(app);

app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(root, mongo.Connect)
  .use('/api', mongo.Error);

app
  .use('/api/users', auth);

app
  .use('/api', mongo.Disconnect);

server.listen(8080, () => logger('SERVER STARTED'));
