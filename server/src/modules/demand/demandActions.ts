import type { RequestHandler } from "express";
import DemandRepository from "./demandRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const { userId, activityId } = req.body;
    console.log("From BACKE", "userId:", userId, "activityId:", activityId);

    const response = await DemandRepository.create(userId, activityId);

    res.json(response);
  } catch (err) {
    next(err);
  }
};

export default { add };
