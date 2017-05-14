import bodyParser from 'body-parser';
import http from 'http';
import express from 'express';
import debug from 'debug';
import cors from 'cors';
import * as handlers from './users/handlers';
import * as mongo from './users/mongo';

const logger = debug('matcha:server.js:');
const app = express();
const server = http.createServer(app);

app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api', mongo.Connect);

app
  .post('/api/users/register', handlers.register);

app
  .use('/api', mongo.Disconnect);

server.listen(8080, () => logger('SERVER STARTED'));
