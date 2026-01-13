import express from "express";

const router = express.Router();

import ActivityAction from "./modules/Activity/activityAction";

router.get("/api/activity/filters", ActivityAction.browse);

/* ************************************************************************* */

export default router;
