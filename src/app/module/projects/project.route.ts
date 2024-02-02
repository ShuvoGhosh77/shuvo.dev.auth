import express, { NextFunction, Request, Response } from "express";
import { ProjectController } from "./project.controller";
import { FileUploadHelper } from "../../../helpers/FileUploadHelper";
import auth from "../../middlewares/auth";


const router = express.Router();


router.get("/", ProjectController.getAllProject);
// router.post('/create-project',ProjectController.createProject);
router.post(
  '/create-project',
  auth("Admin"),
  FileUploadHelper.upload.single('file'),
  (req:Request,res:Response,next:NextFunction)=>{
   req.body=JSON.parse(req.body.data)
   return ProjectController.insertIntoDB(req,res,next)
  }
);

export const projectRoutes = router;

