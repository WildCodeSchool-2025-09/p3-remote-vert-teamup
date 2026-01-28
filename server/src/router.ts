import express from "express";
import activityActions from "./modules/activity/activityActions";
import sportActions from "./modules/sport/sportActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

router.get("/api/sports", sportActions.browse);
router.post("/api/activity", activityActions.add);
router.get("/api/activities", activityActions.browse);
router.get("/api/users", userActions.readByEmail);
router.get("/api/activities/me", activityActions.browseMine);

export default router;
