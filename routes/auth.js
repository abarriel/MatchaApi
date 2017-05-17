import { Router } from 'express';
import * as handlers from '../auth/dispatchQueriesAuth';

const router = Router();

router
  .post('/register', handlers.register)
  .post('/login', handlers.login)
  .put('/resetpassword', handlers.resetPassword)
  .get('/resetpassword', handlers.resetPasswordForm)
  .post('/confirmuser', handlers.confirmUserMail);

export default router;
