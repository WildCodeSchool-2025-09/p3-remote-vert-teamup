import type { RequestHandler } from "express";
import activityRepository from "./activityRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const activities = await activityRepository.readAll();

    // Respond with the items in JSON format
    res.json(activities);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse };
