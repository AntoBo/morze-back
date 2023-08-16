import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HttpError from '../helpers/HttpError';
import { User } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET_KEY } = process.env;

const signup = async (req, res, next) => {
  const { name, password, isAdmin } = req.body;
  const user = await User.findOne({ where: { name } });

  if (user) {
    return next(HttpError(409, 'Name already in use'));
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, password: hashPassword, isAdmin });

  delete newUser.password;

  res.status(201).json(newUser);
};

const login = async (req, res, next) => {
  const { name, password } = req.body;
  const user = await User.findOne({ where: { name }, attributes: { include: ['password'] } });

  if (!user) {
    return next(HttpError(401, 'Email or password is invalid'));
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    return next(HttpError(401, 'Email or password is invalid'));
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

  res.json({
    token,
    name: user.name,
  });
};
export { signup, login };
