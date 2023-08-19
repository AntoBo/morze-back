import express from 'express';
import { ban, getAll, remove } from '../../controllers/userController';

const usersRouter = express.Router();

usersRouter.get('/', getAll);
usersRouter.delete('/:id', remove);
usersRouter.put('/:id', ban);

export default usersRouter;
