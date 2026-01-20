import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "./userRepository";

const validateUsername: RequestHandler = async (req, res, next) => {
  try {
    const { username } = req.query;

    if (typeof username !== "string") {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    if (username.trim() === "") {
      res.sendStatus(StatusCodes.NO_CONTENT);
    }

    const usernameExist = await userRepository.checkUsername(username);

    if (!usernameExist) {
      res.sendStatus(StatusCodes.NOT_FOUND);
    }

    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default { validateUsername };
