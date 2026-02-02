import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import participateRepository from "../participation/participationRepository";
import activityRepository from "./activityRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const { activity, guestIds } = req.body;

    if (!activity.visibility && guestIds.length === 0) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        error: "Une activité privée doit avoir au moins un participant",
      });
      return;
    }

    const activityId = await activityRepository.create(activity);

    if (!activity.visibility) {
      guestIds.map(async (userId: number) => {
        await participateRepository.create({
          userId,
          activityId,
          status: "inviting",
        });
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

    const filters: Filters = JSON.parse(req.query.filters as string);

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

const browseMine: RequestHandler = async (req, res, next) => {
  try {
    const userId = 25;
    const status = req.query.status as string;

    const activities = await activityRepository.readAllByUserAndStatus(
      userId,
      status,
    );

    res.status(200).json(activities);
  } catch (err) {
    next(err);
  }
};

export default { add, browse, browseMine };
