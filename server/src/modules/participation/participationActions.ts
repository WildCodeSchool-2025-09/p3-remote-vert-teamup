import type { RequestHandler } from "express";
import ParticipationRepository from "./participationRepository";
import participateRepository from "./participationRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const participant = await participateRepository.read(req.body);
    if (participant) {
      res.json({
        message: "Participant already enrolled",
        participant,
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

export default { add };
