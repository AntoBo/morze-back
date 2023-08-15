import express from 'express';
import { signup } from '../../controllers/authController';

const authRouter = express.Router();

authRouter.post('/signup', signup);
// router.post('/signup', validateBody(authSchemas.signup), controller.signup);

export default authRouter;
