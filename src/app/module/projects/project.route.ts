import express from "express";
import { ProjectController } from "./project.controller";

const router = express.Router();


router.get("/", ProjectController.getAllProject);
router.post('/create-project',ProjectController.createProject);

export const projectRoutes = router;

