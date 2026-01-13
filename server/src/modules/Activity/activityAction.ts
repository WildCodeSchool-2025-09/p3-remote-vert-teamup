import type { RequestHandler } from "express";

import itemRepository from "./activityRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const checkFilters =
      typeof req.query.filters === "string" ? req.query.filters : "{}";

    const filters = JSON.parse(checkFilters);
    console.log(filters);

    const response = await itemRepository.readAll(filters);

    res.json(response);
  } catch (err) {
    next(err);
  }
};

export default { browse };
