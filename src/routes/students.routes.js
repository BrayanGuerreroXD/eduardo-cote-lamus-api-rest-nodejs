import { Router } from "express";
import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/students.controller.js";

const router = Router();

router.get("/students", getStudents);

router.get("/students/:code", getStudent);

router.post("/students", createStudent);

router.patch("/students/:code", updateStudent);

router.delete("/students/:code", deleteStudent);

export default router;
