import express from "express";
import activityActions from "./modules/activity/activityActions";
import sportActions from "./modules/sport/sportActions";
import userActions from "./modules/user/userActions";
import participationActions from "./modules/participation/participationActions";

const router = express.Router();

router.get("/api/sports", sportActions.browse);
router.post("/api/activity", activityActions.add);
router.get("/api/activities", activityActions.browse);
router.get("/api/users", userActions.readByEmail);
router.get("/api/activities/me", activityActions.browseMine);

router.post(
  "/api/participation",
  participationActions.verifyParticipation,
  participationActions.add,
);
router.put("/api/participation", participationActions.editStatus);
router.delete("/api/participation", participationActions.deleteParticipation);

export default router;
