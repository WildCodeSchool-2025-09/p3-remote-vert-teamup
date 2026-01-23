import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const readUser: RequestHandler = async (req, res, next) => {
  try {
    const email = req.query.email as string;

    const user = await userRepository.readUserbyEmail(email);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export default { readUser };
