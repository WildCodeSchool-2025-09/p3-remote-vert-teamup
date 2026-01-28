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

const updateRefused: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.body.userId);
    const activityId = Number(req.body.activityId);
    await participationRepository.editRefused(userId, activityId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const updateAccepted: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.body.userId);
    const activityId = Number(req.body.activityId);
    await participationRepository.editAccepted(userId, activityId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, updateRefused, updateAccepted };
