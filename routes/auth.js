import { Router } from 'express';
import * as handlers from '../users/dispatchQueries';

const router = Router();

router
  .post('/register', handlers.register);

export default router;
