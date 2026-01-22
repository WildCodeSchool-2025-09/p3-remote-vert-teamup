import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import participationRepository from "../participation/participationRepository";
import activityRepository from "./activityRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const { activity, guestIds } = req.body;

    const activityId = await activityRepository.create(activity);

    if (!activity.visibility && guestIds.length === 0) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        error: "Une activité privée doit avoir au moins un participant",
      });
      return;
    }

    if (!activity.visibility) {
      guestIds.map(async (guestId: number) => {
        await participationRepository.create(guestId, activityId);
      });
    }

    res.status(StatusCodes.CREATED).json();
    return;
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
