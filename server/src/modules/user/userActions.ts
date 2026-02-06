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
function hasCode(err: unknown): err is { code: string } {
  return typeof err === "object" && err !== null && "code" in err;
}
const add: RequestHandler = async (req, res, next) => {
  try {
    const password = req.body.hashed_password;
    const insertId = await userRepository.create(req.body);
    res.status(200).json({ insertId });
  } catch (err: unknown) {
    if (hasCode(err) && err.code === "ER_DUP_ENTRY") {
      res.status(409).json(err);
    } else {
      next(err);
    }
  }
};

export default { readByEmail, add };
