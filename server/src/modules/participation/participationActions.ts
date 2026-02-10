import type { RequestHandler } from "express";
import participationRepository from "./participationRepository";
import ParticipationRepository from "./participationRepository";
import activityRepository from "../activity/activityRepository";
import mailService from "../../services/mailService";

const browseByActivity: RequestHandler = async (req, res, next) => {
  try {
    const activityId = Number(req.query.id);

    const participants =
      await participationRepository.readAllParticipants(activityId);

    res.json(participants);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const response = await participationRepository.create(req.body);

    const activityData = await activityRepository.readWithOrganizer(
      req.body.activityId,
      req.body.userId,
    );

    if (!activityData.visibility) {
      await mailService.sendInvitationEmail({
        participantEmail: activityData.participant_email,
        organizerUsername: activityData.organizer_username,
        activityName: activityData.name,
        participantUsername: activityData.participant_username,
      });
    }

    if (activityData.visibility) {
      await mailService.sendRequestEmail({
        organizerEmail: activityData.organizer_email,
        organizerUsername: activityData.organizer_username,
        activityName: activityData.name,
        participantUsername: activityData.participant_username,
        autoValidation: activityData.auto_validation,
      });
    }

    res.json(response);
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      (err as { code?: string }).code === "ER_DUP_ENTRY"
    ) {
      res.sendStatus(409);
    }
    next(err);
  }
};

const editStatus: RequestHandler = async (req, res, next) => {
  try {
    const { userId, activityId, status, participantUsername, type } = req.body;

    const result = await ParticipationRepository.update(
      userId,
      activityId,
      status,
    );

    if (
      (status === "accepted" || status === "refused") &&
      type === "invitation"
    ) {
      const activity = await activityRepository.readWithOrganizer(
        userId,
        activityId,
      );

      await mailService.sendAnswerInvitationEmail({
        organizerEmail: activity.organizer_email,
        organizerUsername: activity.organizer_username,
        activityName: activity.name,
        participantUsername: participantUsername,
        status: status,
      });
    } else if (
      (status === "accepted" || status === "refused") &&
      type === "request"
    ) {
      const activity = await activityRepository.readWithOrganizer(
        userId,
        activityId,
      );

      await mailService.sendAnswerRequestEmail({
        participantEmail: activity.participant_email,
        participantUsername: participantUsername,
        organizerUsername: activity.organizer_username,
        activityName: activity.name,
        status: status,
      });
    }

    res.json({ message: "Participation updated", result });
  } catch (err) {
    next(err);
  }
};

export default {
  add,
  editStatus,
  browseByActivity,
};
