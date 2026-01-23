import express from "express";
import activityActions from "./modules/activity/activityActions";
import participationActions from "./modules/participation/participationActions";
import sportAction from "./modules/sport/sportAction";
import userActions from "./modules/user/userActions";

const router = express.Router();

router.get(
  "/api/publications",
  activityActions.browseActivitiesPublicatedByUser,
);
router.get("/api/activities", activityActions.browse);

router.get("/api/sport", sportAction.browse);

router.get("/api/user", userActions.readUser);

router.get("/api/participants", participationActions.browseByActivity);
router.patch("/api/participant/:id", participationActions.edit);
router.post("/api/me/invitation", participationActions.add);

export default router;
