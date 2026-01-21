import express from "express";
import activityActions from "./modules/activity/activityActions";
import sportAction from "./modules/sport/sportAction";

const router = express.Router();

router.get(
  "/api/publications",
  activityActions.browseActivitiesPublicatedByUser,
);

router.get("/api/activities", activityActions.browse);
router.get("/api/sport", sportAction.browse);

export default router;
