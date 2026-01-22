import type { RequestHandler } from "express";
import demandRepository from "./demandRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const { userId, activityId, status } = req.body;

    const participants = await demandRepository.create(
      userId,
      activityId,
      status,
    );

    res.json(participants);
  } catch (err) {
    next(err);
  }
};

export default { add };
