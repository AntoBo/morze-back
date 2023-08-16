import HttpError from '../helpers/HttpError';
import { User } from '../models/User';

const getAll = async (req, res) => {
  const users = await User.findAll({ where: { isAdmin: false } });

  res.json(users);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return next(HttpError(404, 'User not found'));
  }

  await user.destroy();

  res.status(200).json({
    message: 'User removed',
  });
};

const ban = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return next(HttpError(404, 'User not found'));
  }

  user.isBanned = !user.isBanned;

  await user.save({ fields: ['isBanned'] });

  res.status(200).json({
    message: `User was ${user.isBanned ? '' : 'un'}banned`,
  });
};

export { getAll, remove, ban };
