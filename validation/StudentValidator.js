import Joi from 'joi';

export const studentSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
  address: Joi.string().max(255).optional(),
});