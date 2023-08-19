import Joi from 'joi';

export default Joi.object({
  name: Joi.string().alphanum().required().min(3).max(255),
  password: Joi.string().required().min(8).max(255),
});
