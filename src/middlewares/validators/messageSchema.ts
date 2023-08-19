import Joi from 'joi';

export default Joi.string().required().max(255);
// export default Joi.object({
//   message: Joi.string().required().max(255),
// });
