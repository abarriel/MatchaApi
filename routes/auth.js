import { Router } from 'express';
import * as handlers from '../auth/dispatchQueriesAuth';

const router = Router();

router
  .get('/check_authenticate', handlers.checkAuthenticate)
  .post('/register', handlers.register)
  .put('/confirmuser', handlers.confirmUserMail)
  .post('/login', handlers.login)
  .post('/resetpassword', handlers.resetPassword)
  .get('/resetpassword', handlers.resetPasswordForm);

export default router;
