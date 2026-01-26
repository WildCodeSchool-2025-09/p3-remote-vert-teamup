import type { RequestHandler } from "express";
import ParticipationRepository from "./participateRepository";

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

export default { add };
