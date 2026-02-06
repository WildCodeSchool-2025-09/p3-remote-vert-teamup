import express from "express";
import activityActions from "./modules/Activity/activityActions";
import authActions from "./modules/auth/authActions";
import sportActions from "./modules/sport/sportActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

router.get("/api/sports", sportActions.browse);
router.post("/api/activity", activityActions.add);
router.get("/api/activities", activityActions.browse);
router.get("/api/users", userActions.readByEmail);
router.get("/api/activities/me", activityActions.browseMine);
router.post(
  "/api/users",
  authActions.validateCreateUser,
  authActions.hashPassword,
  userActions.add,
);

export default router;
