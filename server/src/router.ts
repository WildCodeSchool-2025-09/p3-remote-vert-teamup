import express from "express";
import activityActions from "./modules/activity/activityActions";
import demandActions from "./modules/demand/demandActions";
import participationActions from "./modules/participation/participationActions";
import sportAction from "./modules/sport/sportAction";

const router = express.Router();

router.get("/api/activities", activityActions.browse);
router.get("/api/sport", sportAction.browse);

router.post("/api/participation", participationActions.add);
router.post("/api/demand", demandActions.add);

export default router;
