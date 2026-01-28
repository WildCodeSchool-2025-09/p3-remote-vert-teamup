import express from "express";
import activityActions from "./modules/activity/activityActions";
import sportActions from "./modules/sport/sportActions";

const router = express.Router();

router.get("/api/me/publications", activityActions.browseByCreator);

router.get("/api/sports", sportActions.browse);

router.post("/api/activity", activityActions.add);
router.get("/api/activities", activityActions.browse);

export default router;
