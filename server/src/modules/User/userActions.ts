import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "./userRepository";

const readByEmail: RequestHandler = async (req, res, next) => {
  try {
    const email = req.query.email as string;

    if (email.trim() === "") {
      res.sendStatus(StatusCodes.NO_CONTENT);
    }

    const user = await userRepository.readByEmail(email);

    if (!user) {
      res.sendStatus(StatusCodes.NOT_FOUND);
    }

    res.json(user).status(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default { readByEmail };
