import express from "express";
import activityActions from "./modules/activity/activityActions";
import sportActions from "./modules/sport/sportActions";
import userActions from "./modules/user/userActions";
import participationActions from "./modules/participation/participationActions";

const router = express.Router();

router.get("/api/sports", sportActions.browse);

router.get("/api/users", userActions.readByEmail);

router.get("/api/activities", activityActions.browse);
router.get("/api/activities/me", activityActions.browseMine);
router.get("/api/activities/:id", activityActions.read);
router.post("/api/activities", activityActions.add);

router.get("/api/participations", participationActions.browseByActivity);
router.post("/api/participations", participationActions.add);
router.put("/api/participations", participationActions.editStatus);

export default router;
