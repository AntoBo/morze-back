import express from 'express';
import { login, signup } from '../../controllers/authController';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
// router.post('/signup', validateBody(authSchemas.signup), controller.signup);

export default authRouter;
