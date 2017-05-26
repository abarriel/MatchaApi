import { Router } from 'express';
import * as handlers from '../auth/HandlersQuery';

const router = Router();

router
  .get('/check_authenticate', handlers.checkAuthenticate)
  .put('/resetpassword', handlers.resetPassword)
  .put('/confirmuser', handlers.confirmUserMail)
  .post('/register', handlers.register)
  .post('/login', handlers.login)
  .post('/forgetpassword', handlers.forgetPassword);

export default router;
