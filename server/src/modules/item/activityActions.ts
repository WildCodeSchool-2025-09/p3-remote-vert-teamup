import type { RequestHandler } from "express";
import activityRepository from "./activityRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const items = await activityRepository.readAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export default { browse };
