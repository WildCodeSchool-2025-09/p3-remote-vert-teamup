import argon2 from "argon2";
import type { RequestHandler } from "express";
import Joi from "joi";

const createUserSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required(),
  password: Joi.string().min(8).max(72).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  email: Joi.string().trim().email().required(),
  firstName: Joi.string().trim().min(1).max(50).required(),
  lastName: Joi.string().trim().min(1).max(50).required(),
  dateOfBirth: Joi.string().required(),
  address: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  zipCode: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
  picture: Joi.string().trim().allow("").optional(),
}).options({ abortEarly: false, stripUnknown: true });

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

const validateCreateUser: RequestHandler = async (req, res, next) => {
  try {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: "VALIDATION_ERROR" });
      return;
    }
    req.body = value;
    next();
  } catch (err) {
    next(err);
  }
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
};

export default { validateCreateUser, hashPassword };
