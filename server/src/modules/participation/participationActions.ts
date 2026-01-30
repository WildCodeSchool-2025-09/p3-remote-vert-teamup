import type { RequestHandler } from "express";
import ParticipationRepository from "./participationRepository";
import participateRepository from "./participationRepository";

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

export default { add, verifyParticipation };
