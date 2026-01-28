import type { RequestHandler } from "express";
import participationRepository from "./participationRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.query.userId);
    const invitations = await participationRepository.readAll(userId);
    res.json(invitations);
  } catch (err) {
    next(err);
  }
};

export default { browse };
