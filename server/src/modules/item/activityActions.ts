import type { RequestHandler } from "express";
import activityRepository from "./activityRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const userId = 5;
    const items = await activityRepository.readAll(userId);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export default { browse };
