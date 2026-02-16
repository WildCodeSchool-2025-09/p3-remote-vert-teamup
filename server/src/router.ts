import express from "express";
import activityActions from "./modules/activity/activityActions";
import sportActions from "./modules/sport/sportActions";
import userActions from "./modules/user/userActions";
import participationActions from "./modules/participation/participationActions";
import authActions from "./modules/auth/authActions";

const router = express.Router();

router.get("/api/sports", sportActions.browse);

router.get("/api/users", userActions.readByEmail);
router.post("/api/users", userActions.validate, userActions.add);

router.get("/api/activities", activityActions.browse);
router.get("/api/activities/:id", activityActions.read);

router.post("/api/login", authActions.logIn);
router.get("/api/participants", participationActions.browseByActivity);

router.use(authActions.verifyToken);

router.get("/api/profile", userActions.read);
router.post("/api/activities", activityActions.add);
router.get("/api/me/activities", activityActions.browseMine);

router.get("/api/participations", participationActions.browseSome);
router.post(
  "/api/participations",
  activityActions.verifyNbAvaiableSpots,
  participationActions.add,
);
router.put(
  "/api/participations",
  activityActions.verifyNbAvaiableSpots,
  participationActions.editStatus,
);

export default router;
