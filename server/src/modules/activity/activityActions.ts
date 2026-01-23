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

    const filters: Filters = {
      sport: req.query.sport as string,
      city: req.query.city as string,
      playingAt: req.query.playingAt as string,
    };

    const { activities, totalActivities, totalPages } =
      await activityRepository.readAll(page, limit, filters);

    res.json({
      activities: activities,
      pagination: {
        page,
        limit,
        totalActivities,
        totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default { add, browse };
