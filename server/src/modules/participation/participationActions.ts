import type { RequestHandler } from "express";
import ParticipationRepository from "./participateRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const { userId, activityId } = req.body;

    const response = await ParticipationRepository.create(userId, activityId);

    res.json(response);
  } catch (err) {
    next(err);
  }
};

export default { add };
