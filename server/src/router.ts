import express from "express";
import activityActions from "./modules/activity/activityActions";
import participationActions from "./modules/participation/participationActions";
import sportActions from "./modules/sport/sportActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

router.get(
  "/api/publications",
  activityActions.browseActivitiesPublicatedByUser,
);
router.get("/api/activities", activityActions.browse);

router.get("/api/sport", sportActions.browse);

router.get("/api/user", userActions.readUser);

router.get("/api/participants", participationActions.browseByActivity);
router.patch("/api/participant/:id", participationActions.edit);
router.post(
  "/api/me/invitation",
  participationActions.validate,
  participationActions.add,
);

export default router;
