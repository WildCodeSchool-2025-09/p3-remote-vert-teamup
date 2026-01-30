import type { RequestHandler } from "express";
import ParticipationRepository from "./participationRepository";
import participateRepository from "./participationRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const participant = await participateRepository.read(req.body);
    if (participant[0]) {
      res.json({
        alreadyClicked: true,
      });
      return;
    }

    const response = await ParticipationRepository.create(req.body);

    res.json(response);
  } catch (err) {
    next(err);
  }
};

const browseSome: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.query.userId);

    if (!userId) {
      res.json({
        message: "User is not enrolled in any activity",
      });
      return;
    }

    const activitiesUserEnrolled = await participateRepository.read({ userId });

    res.status(201).json(activitiesUserEnrolled.map((a) => a.activity_id));
  } catch (err) {
    next(err);
  }
};

export default { add, browseSome };
