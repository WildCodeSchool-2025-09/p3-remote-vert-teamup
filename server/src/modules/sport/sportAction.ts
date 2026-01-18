import type { RequestHandler } from "express";
import sportRepository from "./sportRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const sportName = req.query.name?.toString();
    if (sportName) {
      const sport = await sportRepository.readSome(sportName);
      res.json(sport);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse };
