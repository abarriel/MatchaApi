import { Router } from 'express';
import * as handlers from '../auth/dispatchQueriesAuth';

const router = Router();

router
  .post('/register', handlers.register)
  .post('/login', handlers.login)
  .put('/resetpassword', handlers.resetPassword)
  .post('/confirmuser', handlers.confirmUserMail);

export default router;
