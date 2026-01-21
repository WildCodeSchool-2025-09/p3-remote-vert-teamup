import express from "express";
import activityActions from "./modules/activity/activityActions";
import sportAction from "./modules/sport/sportAction";
import userActions from "./modules/user/userActions";

const router = express.Router();

router.get(
  "/api/publications",
  activityActions.browseActivitiesPublicatedByUser,
);

router.get("/api/activities", activityActions.browse);
router.get("/api/sport", sportAction.browse);

router.get("/api/participants", userActions.browseParticipants);

export default router;
