import express from "express";
import activityActions from "./modules/Activity/activityActions";
import sportAction from "./modules/sport/sportAction";

const router = express.Router();

router.get("/api/activities", activityActions.browse);
router.get("/api/sport", sportAction.browse);
router.get("/api/venir", activityActions.browse);

export default router;
