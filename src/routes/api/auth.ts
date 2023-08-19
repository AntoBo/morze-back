import express from 'express';
import { login, signup } from '../../controllers/authController';
import { validateBody } from '../../helpers/validateWrapper';
import loginSchema from '../../middlewares/validators/loginSchema';

const authRouter = express.Router();

authRouter.post('/signup', validateBody(loginSchema), signup);
authRouter.post('/login', validateBody(loginSchema), login);

export default authRouter;
