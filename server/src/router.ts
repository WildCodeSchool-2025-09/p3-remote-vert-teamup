import express from "express";
import activityActions from "./modules/activity/activityActions";
import sportActions from "./modules/sport/sportActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

router.get("/api/sports", sportActions.browse);
router.post("/api/activity/publish", activityActions.add);
router.get("/api/activities", activityActions.browse);
router.get("/api/user", userActions.readUserByEmail);
router.get("/api/sport", sportActions.read);

export default router;
