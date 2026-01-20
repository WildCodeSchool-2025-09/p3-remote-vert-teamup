import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import activityActions from "./modules/item/activityActions";
router.get("/api/venir", activityActions.browse);
/* ************************************************************************* */

export default router;
