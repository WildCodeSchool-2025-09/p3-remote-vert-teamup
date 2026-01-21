import express from "express";

const router = express.Router();

import activityActions from "./modules/activity/activityActions";
import userActions from "./modules/user/userActions";

router.get(
  "/api/publications",
  activityActions.browseActivitiesPublicatedByUser,
);

router.get("/api/activities", activityActions.browse);

router.get("/api/participants", userActions.browseParticipants);

export default router;
