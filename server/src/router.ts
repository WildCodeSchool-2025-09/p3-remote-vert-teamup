import express from "express";

const router = express.Router();

import ActivityAction from "./modules/activity/activityAction";

router.get("/api/activity/filters", ActivityAction.browse);

/* ************************************************************************* */

export default router;
