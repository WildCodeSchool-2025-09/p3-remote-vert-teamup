import express from "express";
import sportActions from "./modules/sport/sportActions";

const router = express.Router();

import activityActions from "./modules/activity/activityActions";
import userActions from "./modules/user/userActions";

router.get("/api/sports", sportActions.browse);
router.post("/api/activity/publish", activityActions.add);
router.get("/api/activities", activityActions.browse);
router.get("/api/user", userActions.readUserByEmail);

export default router;
