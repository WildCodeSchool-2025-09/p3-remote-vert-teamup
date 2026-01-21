import express from "express";
import sportActions from "./modules/sport/sportActions";

const router = express.Router();

import userActions from "./modules/User/userActions";
import activityActions from "./modules/activity/activityActions";

router.get("/api/sports", sportActions.browse);
router.post("/api/activity", activityActions.add);
router.get("/api/activities", activityActions.browse);

router.get("/api/publication", userActions.readByUsername);

export default router;
