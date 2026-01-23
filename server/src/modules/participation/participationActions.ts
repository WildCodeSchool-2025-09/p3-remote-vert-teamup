import type { RequestHandler } from "express";
import participationRepository from "./participationRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const { userId, activityId, status } = req.body;

    const insertId = await participationRepository.create(
      userId,
      activityId,
      status,
    );

    res.json(insertId);
  } catch (err) {
    next(err);
  }
};

export default { add };
