import type { RequestHandler } from "express";
import ParticipationRepository from "./participationRepository";
import participateRepository from "./participationRepository";
import activityRepository from "../Activity/activityRepository";
import mailService from "../../services/mailService";

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      userId: req.body.userId,
      activityId: req.body.activityId,
      status: req.body.status,
    };

    const response = await ParticipationRepository.create(newUser);

    res.json(response);
  } catch (err) {
    next(err);
  }
};

const verifyParticipation: RequestHandler = async (req, res, next) => {
  try {
    const { userId, activityId } = req.body;

    console.log(req.body);

    const participant = await participateRepository.read(userId, activityId);

    if (participant) {
      res.json({
        message: "Participant already enrolled",
        participant,
        alreadyClicked: true,
      });
      return;
    }
    next();
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

export default { add, verifyParticipation, editStatus, deleteParticipation };
