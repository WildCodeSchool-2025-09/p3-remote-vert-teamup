import express from "express";
import sportAction from "./modules/sport/sportAction";
import activityAction from "./modules/activity/activityAction";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
router.get("/api/sport", sportAction.browse);
router.get("/api/activity", activityAction.browse);
// Define item-related routes

/* ************************************************************************* */

export default router;
