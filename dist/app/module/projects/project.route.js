"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("./project.controller");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get("/", project_controller_1.ProjectController.getAllProject);
// router.post('/create-project',ProjectController.createProject);
router.post('/create-project', (0, auth_1.default)("Admin"), FileUploadHelper_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return project_controller_1.ProjectController.insertIntoDB(req, res, next);
});
exports.projectRoutes = router;
