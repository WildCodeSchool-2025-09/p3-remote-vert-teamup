import type { RequestHandler } from "express";
import sportRepository from "./sportRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const sportName = req.query.name as string;

    if (!sportName) {
      res.status(404).json({ error: "Sport not found" });
    }

    const sport = await sportRepository.readSome(sportName);

    res.json(sport);
  } catch (err) {
    next(err);
  }
};

export default { browse };
