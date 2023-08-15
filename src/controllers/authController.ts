import bcrypt from 'bcrypt';
import HttpError from '../helpers/HttpError';
import { User } from '../models/User';

const signup = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ where: { name } });

  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, password: hashPassword });

  delete newUser.password;

  res.status(201).json(newUser);
};
export { signup };
