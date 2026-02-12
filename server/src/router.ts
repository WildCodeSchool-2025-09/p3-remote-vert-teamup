import express from "express";
import activityActions from "./modules/Activity/activityActions";
import sportActions from "./modules/sport/sportActions";
import userActions from "./modules/user/userActions";
import participationActions from "./modules/participation/participationActions";
import authActions from "./modules/auth/authActions";

const router = express.Router();

router.get("/api/sports", sportActions.browse);

router.get("/api/users", userActions.readByEmail);

router.get("/api/activities", activityActions.browse);
router.get("/api/activities/:id", activityActions.read);

router.post("/api/users", userActions.validate, userActions.add);
router.post("/api/login", authActions.logIn);

router.use(authActions.verifyToken);

router.get("/api/profile", userActions.read);
router.post("/api/activity", activityActions.add); //thomas
router.get("/api/me/activities", activityActions.browseMine); //thomas
router.get("/api/participants", participationActions.browseByActivity); // solo
router.get("/api/participations", participationActions.browseSome);
router.post("/api/participation", participationActions.add); //lisa
router.put("/api/participation", participationActions.editStatus); //lisa
router.patch("/api/participant/:id", participationActions.edit); //thomas
router.delete("/api/participation", participationActions.deleteParticipation); //lisa

export default router;
