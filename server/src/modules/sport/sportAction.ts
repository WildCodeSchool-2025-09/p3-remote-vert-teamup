import type { RequestHandler } from "express";

// Import access to data
import sportRepository from "./sportRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const sportName = req.query.name?.toString();
    if (sportName) {
      const sport = await sportRepository.readSome(sportName);
      // Respond with the items in JSON format
      res.json(sport);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse };
