import express from "express";
import activityActions from "./modules/activity/activityActions";
import participationActions from "./modules/participation/participationActions";
import sportAction from "./modules/sport/sportAction";

const router = express.Router();

router.get("/api/sports", sportAction.browse);
router.post("/api/activity", activityActions.add);
router.get("/api/activities", activityActions.browse);
router.get("/api/sport", sportAction.read);
router.get("/api/participation", participationActions.browse);

export default router;
