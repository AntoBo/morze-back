import express from 'express';
import { ban, getAll, remove } from '../../controllers/userController';
import { auth } from '../../middlewares/auth';

const usersRouter = express.Router();

usersRouter.get('/', getAll);
usersRouter.delete('/:id', remove);
usersRouter.put('/:id', ban);
// router.post('/signup', validateBody(authSchemas.signup), controller.signup);

export default usersRouter;
