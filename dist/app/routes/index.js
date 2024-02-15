"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_route_1 = require("../module/projects/project.route");
const user_route_1 = require("../module/user/user.route");
const auth_route_1 = require("../module/auth/auth.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/project",
        route: project_route_1.projectRoutes
    },
    {
        path: '/user',
        route: user_route_1.userRoutes
    },
    {
        path: '/auth',
        route: auth_route_1.authRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
