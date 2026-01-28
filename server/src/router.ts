import express from "express";
import activityActions from "./modules/Activity/activityActions";
import participationActions from "./modules/participation/participationActions";
import sportAction from "./modules/sport/sportAction";

const router = express.Router();

router.get("/api/activities", activityActions.browse);
router.get("/api/sport", sportAction.browse);

router.post(
  "/api/participation",
  participationActions.verifyParticipation,
  participationActions.add,
);

export default router;
