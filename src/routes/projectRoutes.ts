import express from "express"
import { readProjects, createProject, readProject, updateProject, deleteProject } from "../controllers/projectController";

const router = express.Router();

router.post("/", createProject);

router.get("/", readProjects);

router.get("/:id", readProject);

router.patch("/:id", updateProject);

router.delete("/:id", deleteProject);

export default router;
