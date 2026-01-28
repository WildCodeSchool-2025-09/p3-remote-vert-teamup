import type { RequestHandler } from "express";
import sportRepository from "./sportRepository";

const list: RequestHandler = async (req, res, next) => {
  try {
    const sportName = req.query.name as string;

    const sports = await sportRepository.find(sportName);

    res.json(sports);
  } catch (err) {
    next(err);
  }
};

export default { list };
