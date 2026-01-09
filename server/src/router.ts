import express from "express";
import activityActions from "./modules/activity/activityActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

router.post("/api/activity", activityActions.add);

/* ************************************************************************* */

export default router;
