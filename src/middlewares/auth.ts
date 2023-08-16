import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import HttpError from '../helpers/HttpError';
import dotenv from 'dotenv';
dotenv.config();
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findByPk(id);
    if (!user) {
      return next(HttpError(401));
    }

    req.user = user;
    next();
  } catch {
    return next(HttpError(401));
  }
};

const authAdmin = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findByPk(id);
    if (!user && !user.isAdmin) {
      return next(HttpError(401));
    }

    req.user = user;
    next();
  } catch {
    return next(HttpError(401));
  }
};

export { auth, authAdmin };
