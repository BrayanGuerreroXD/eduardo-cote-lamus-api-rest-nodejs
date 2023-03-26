import { Router } from "express";
import {
    getRegisters,
    getRegister,
    getRegistersByStudent,
    createRegister,
    updateRegister,
    deleteRegister,   
} from "../controllers/registers.controller.js";

const router = Router();

router.get("/registers", getRegisters);

router.get("/registers/:id", getRegister);

router.get("/registers/student/:code", getRegistersByStudent);

router.post("/registers", createRegister);

router.patch("/registers/:id", updateRegister);

router.delete("/registers/:id", deleteRegister);

export default router;