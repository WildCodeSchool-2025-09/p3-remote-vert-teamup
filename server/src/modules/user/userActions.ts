import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const browseParticipants: RequestHandler = async (req, res, next) => {
  try {
    const activityId = Number(req.query.id);

    const participants = await userRepository.readAllParticipants(activityId);

    res.json(participants);
  } catch (err) {
    next(err);
  }
};

export default { browseParticipants };
