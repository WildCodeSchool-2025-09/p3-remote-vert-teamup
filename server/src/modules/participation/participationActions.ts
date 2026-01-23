import type { RequestHandler } from "express";
import participationRepository from "./participationRepository";

const browseByActivity: RequestHandler = async (req, res, next) => {
  try {
    const activityId = Number(req.query.id);

    const participants =
      await participationRepository.readAllParticipants(activityId);

    res.json(participants);
  } catch (err) {
    next(err);
  }
};

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

const edit: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const affectedRows = await participationRepository.patch(id, status);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browseByActivity, add, edit };
