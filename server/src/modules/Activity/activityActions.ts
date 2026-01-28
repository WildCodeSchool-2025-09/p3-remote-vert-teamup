import type { RequestHandler } from "express";
import activityRepository from "./activityRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page as string, 10) || 1;
    const limit = Number.parseInt(req.query.limit as string, 10) || 10;

    const filtersInString = req.query.filters as string;
    const filters: Filters = filtersInString ? JSON.parse(filtersInString) : "";

    const userId = Number.parseInt(req.query.userId as string);
    const status = req.query.status && (req.query.status as string);

    const { activities, totalActivities, totalPages } =
      await activityRepository.readAll(page, limit, filters, userId, status);

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

export default { browse };
