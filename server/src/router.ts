import express from "express";

const router = express.Router();

import activityActions from "./modules/Activity/activityActions";
import userActions from "./modules/User/userActions";

router.get("/api/activities", activityActions.browse);

router.get("/api/publication", userActions.validateUsername);

export default router;
