import { Router } from "express";
const router = Router();

import * as proveedorCtrl from "../controllers/proveedor.controller";
import { authJwt } from "../middlewares";

router.get("/", proveedorCtrl.getProveedores);

router.get("/:proveedorId", proveedorCtrl.getProveedorById);

router.post(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    proveedorCtrl.createProveedor
);

router.put(
    "/:proveedorId",
    [authJwt.verifyToken, authJwt.isAdmin],
    proveedorCtrl.updateProveedorById
);

router.delete(
    "/:proveedorId",
    [authJwt.verifyToken, authJwt.isAdmin],
    proveedorCtrl.deleteProveedorById
);

export default router;