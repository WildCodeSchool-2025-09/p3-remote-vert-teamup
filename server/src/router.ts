import express from "express";

const router = express.Router();

import activityActions from "./modules/Activity/activityActions";

router.get(
  "/api/publication",
  activityActions.browseActivitiesPublicatedByUser,
);

router.get("/api/activities", activityActions.browse);

export default router;
