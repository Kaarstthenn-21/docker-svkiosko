import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { authJwt, verifySignup, queryFilter } from "../middlewares";

router.post(
  "/",
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkDuplicateUsernameOrEmail,
  ],
  usersCtrl.createUser
);
/*
router.put(
  "/",
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ],
  usersCtrl.getUser
);*/

router.get(
  "/",
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ],
  usersCtrl.getUsers//recibir usuarios
);
router.get(
  "/:id",
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ],
  usersCtrl.getUser//recibir usuario por id
);

router.delete(
  "/",
  [
    authJwt.verifyToken,
    authJwt.isAdmin
  ],
  usersCtrl.deleteUser
);

export default router;
