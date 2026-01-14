import type { RequestHandler } from "express";

// Import access to data
import activityRepository from "./activityRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const sportName = req.query.name?.toString();
    const sportCity = req.query.city?.toString();
    const sportDate = req.query.date?.toString();

    if (sportName && sportCity && sportDate) {
      const activity = await activityRepository.readSome(
        sportName,
        sportCity,
        sportDate,
      );
      // Respond with the items in JSON format
      res.json(activity);
    } else {
      const activity = await activityRepository.readAll();
      // Respond with the items in JSON format
      res.json(activity);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse };
