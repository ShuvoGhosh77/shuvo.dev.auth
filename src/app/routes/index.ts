import express from 'express';
import { projectRoutes } from '../module/projects/project.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: "/project",
    route: projectRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
