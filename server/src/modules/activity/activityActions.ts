import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import participationRepository from "../participation/participationRepository";
import activityRepository from "../activity/activityRepository";
import mailService from "../../services/mailService";

const add: RequestHandler = async (req, res, next) => {
  try {
    const { activity, guests } = req.body;

    if (!activity.visibility && guests.length === 0) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        error: "Une activité privée doit avoir au moins un participant",
      });
      return;
    }

    const activityId = await activityRepository.create(activity);
    const newsParticipants = guests.map((guest: Partial<User>) => ({
      userId: guest.id,
      activityId: activityId,
      status: "inviting",
    }));

    if (!activity.visibility) {
      for (const newParticipant of newsParticipants) {
        await participationRepository.create(newParticipant);
        const mailData = await activityRepository.readWithOrganizer(
          activityId,
          newParticipant.userId,
        );

        await mailService.sendInvitationEmail(mailData);
      }
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
    const userId = Number(req.query.userId);

    const filters: Filters =
      req.query.filters && JSON.parse(req.query.filters as string);

    const { activities, totalActivities, totalPages } =
      await activityRepository.readAll(page, limit, filters, userId);

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

    res.status(StatusCodes.OK).json(activities);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const activityId = Number.parseInt(req.params.id, 10);

    const activity = await activityRepository.readOne(activityId);

    if (!activity) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Activity not found" });
      return;
    }

    res.json(activity);
  } catch (err) {
    next(err);
  }
};

export default { add, browse, browseMine, read };
