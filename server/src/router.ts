import express from "express";
import activityActions from "./modules/Activity/activityActions";
import sportActions from "./modules/sport/sportActions";
import userActions from "./modules/user/userActions";
import participationActions from "./modules/participation/participationActions";

const router = express.Router();

router.get("/api/sports", sportActions.browse);
router.post("/api/activity", activityActions.add);
router.get("/api/activities", activityActions.browse);
router.get("/api/users", userActions.readByEmail);

router.post(
  "/api/participation",
  participationActions.verifyParticipation,
  participationActions.add,
);

export default router;
