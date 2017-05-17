import { Router } from 'express';
import * as handlers from '../auth/dispatchQueriesAuth';

const router = Router();

router
  .post('/register', handlers.register)
  .post('/auth', handlers.login)
  .post('/auth/confirm', handlers.confirmUserMail);

export default router;
