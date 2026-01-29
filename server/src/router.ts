import express from "express";
import activityActions from "./modules/activity/activityActions";
import participationActions from "./modules/participation/participationActions";
import sportActions from "./modules/sport/sportActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

router.get("/api/user", userActions.readByEmail);

router.get("/api/participants", participationActions.browseByActivity);
router.patch("/api/participant/:id", participationActions.edit);
router.post(
  "/api/me/invitation",
  participationActions.validate,
  participationActions.add,
);

router.get("/api/sports", sportActions.browse);

router.get("/api/users", userActions.readByEmail);

router.post("/api/activity", activityActions.add);
router.get("/api/activities", activityActions.browse);
router.get("/api/activities/me", activityActions.browseMine);

export default router;
