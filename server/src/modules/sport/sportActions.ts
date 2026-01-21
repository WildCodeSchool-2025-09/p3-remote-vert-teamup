import type { RequestHandler } from "express";
import sportRepository from "./sportRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const sports = await sportRepository.readAll();
    res.json(sports);
  } catch (err) {
    next(err);
  }
};

export default { browse };
