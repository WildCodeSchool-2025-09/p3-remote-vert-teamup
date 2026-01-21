import type { RequestHandler } from "express";
import activityRepository from "./activityRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const activity = req.body;
    const activityId = await activityRepository.create(activity);
    res.status(201).json({ activityId });
  } catch (err) {
    next(err);
  }
};

const browse: RequestHandler = async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page as string, 10) || 1;
    const limit = Number.parseInt(req.query.limit as string, 10) || 10;

    const { activities, total, totalPages } = await activityRepository.readAll(
      page,
      limit,
    );

    res.json({
      activities: activities,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default { add, browse };
