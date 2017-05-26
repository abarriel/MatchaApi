import bodyParser from 'body-parser';
import http from 'http';
import express from 'express';
import cors from 'cors';
import auth from './routes/auth';
import users from './routes/users';
import { checkAuthenticate } from './modules/authToken';
import * as mongo from './config/mongo';

const app = express();
const server = http.createServer(app);

app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api', checkAuthenticate)
  .use('/api', mongo.Connect)
  .use('/api', mongo.Error)
  .use('/api/auth', auth)
  .use('/api/users', users);

// app.use('/api', mongo.Disconnect);

server.listen(8080);
