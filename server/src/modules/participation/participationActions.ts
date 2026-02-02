import type { RequestHandler } from "express";
import ParticipationRepository from "./participationRepository";
import participateRepository from "./participationRepository";
import activityRepository from "../activity/activityRepository";
import mailService from "../../services/mailService";

const add: RequestHandler = async (req, res, next) => {
  try {
    const participant = await participateRepository.read(req.body);
    if (participant[0]) {
      res.json({
        alreadyClicked: true,
      });
      return;
    }

    const response = await ParticipationRepository.create(req.body);

    res.json(response);
  } catch (err) {
    next(err);
  }
};

const browseSome: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.query.userId);

    if (!userId) {
      res.json({
        message: "User is not enrolled in any activity",
      });
      return;
    }

    const activitiesUserEnrolled = await participateRepository.read({ userId });

    res.status(201).json(activitiesUserEnrolled.map((a) => a.activity_id));
  } catch (err) {
    next(err);
  }
};

const editStatus: RequestHandler = async (req, res, next) => {
  try {
    const { userId, activityId, status, participantUsername } = req.body;

    const result = await ParticipationRepository.update(userId, activityId, status);

    if (status === "accepted") {
      const activity = await activityRepository.readWithOrganizer(activityId);

      await mailService.sendInvitationAcceptedEmail({
        organizerEmail: activity.organizer_email,
        organizerUsername: activity.organizer_username,
        activityName: activity.name,
        participantUsername: participantUsername,
      });
    }

    res.json({ message: "Participation updated", result });
  } catch (err) {
    next(err);
  }
};

const deleteParticipation: RequestHandler = async (req, res, next) => {
  try {
    const { userId, activityId } = req.body;

    const result = await ParticipationRepository.delete(userId, activityId);

    res.json({ message: "Participation deleted", result });
  } catch (err) {
    next(err);
  }
};

export default { add, browseSome, editStatus, deleteParticipation };
