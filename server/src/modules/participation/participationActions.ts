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
    const response = await participationRepository.create(req.body);

    res.json(response);
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

const verifyParticipation: RequestHandler = async (req, res, next) => {
  try {
    const { userId, activityId } = req.body;

    console.log(req.body);

    const participant = await participationRepository.read(userId, activityId);

    if (participant) {
      res.json({
        alreadyClicked: true,
      });
      return;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default { browseByActivity, add, edit, verifyParticipation };
