import express from "express"
import { readProjects, createProject } from "../controllers/projectController";

const router = express.Router();

router.get("/", readProjects);

router.post("/", createProject);

export default router;
