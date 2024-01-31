import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { projectFilterableFields } from "./project.constent";
import sendResponse from "../../../shared/sendResponse";
import { IProject } from "./project.interface";
import httpStatus from 'http-status';
import { paginationFields } from "../../../constants/pagination";
import { ProjectsService } from "./project.service";



const createProject = catchAsync(async (req: Request, res: Response) => {
  const { ...projectData } = req.body;
  const result = await ProjectsService.insertIntoDB(
    projectData
  );
  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  });
});
  
const getAllProject = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, projectFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProjectsService.getAllFromDB(
    filters,
    paginationOptions
  );
 

  sendResponse<IProject[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semesters retrieved successfully !",
    meta: result.meta,
    data: result.data,
  });
});

export const ProjectController = {
  getAllProject,
  createProject

};