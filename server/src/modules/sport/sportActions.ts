import type { RequestHandler } from "express";
import sportRepository from "./sportRepository";

// Gets ALL sports
const browse: RequestHandler = async (req, res, next) => {
  try {
    const sports = await sportRepository.readAll();
    res.json(sports);
  } catch (err) {
    next(err);
  }
};

// Searches sports by name
const read: RequestHandler = async (req, res, next) => {
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

export default { browse, read };
