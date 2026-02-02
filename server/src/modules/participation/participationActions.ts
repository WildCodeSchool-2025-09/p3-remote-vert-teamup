import type { RequestHandler } from "express";
import participationRepository from "./participationRepository";
import { StatusCodes } from "http-status-codes";

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
    req.body.userId = 25;
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

// const verifyParticipation: RequestHandler = async (req, res, next) => {
//   try {
//     const { activityId } = req.body;
//     const userId = 25;

//     const participant = await participationRepository.read(userId, activityId);

//     if (participant) {
//       res.sendStatus(StatusCodes.CONFLICT);

const browseSome: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.query.userId);

    if (!userId) {
      res.json({
        message: "User is not enrolled in any activity",
      });
      return;
    }

    const activitiesUserEnrolled = await participationRepository.read({
      userId,
    });

    res.status(201).json(activitiesUserEnrolled.map((a) => a.activity_id));
  } catch (err) {
    next(err);
  }
};

export default { browseByActivity, add, edit, browseSome };
