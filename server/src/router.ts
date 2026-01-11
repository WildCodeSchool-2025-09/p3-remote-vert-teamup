import express from "express";
import activityActions from "./modules/activity/activityActions";
import sportActions from "./modules/sport/sportActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

router.get("/api/sports", sportActions.browse);
router.post("/api/activity", activityActions.add);

/* ************************************************************************* */

export default router;
