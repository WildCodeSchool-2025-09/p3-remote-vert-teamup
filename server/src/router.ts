import express from "express";
import activityActions from "./modules/Activity/activityActions";
import sportAction from "./modules/sport/sportAction";

const router = express.Router();

router.get("/api/me/publications", activityActions.browseByCreator);

router.get("/api/sports", sportAction.browse);
router.post("/api/activity", activityActions.add);
router.get("/api/activities", activityActions.browse);
router.get("/api/sport", sportAction.read);

export default router;
