import { Prisma, Projects } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { projectSearchableFields } from "./project.constent";
import { IProjectFilters } from "./project.interface";

const insertIntoDB = async (data:Projects):Promise<Projects>=> {

  const result = await prisma.projects.create({
    data
  });
  return result;
};

const getAllFromDB = async (
  filters: IProjectFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Projects[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  console.log(options);
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: projectSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditons.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.ProjectsWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.projects.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.projects.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const ProjectsService = {
  insertIntoDB,
  getAllFromDB
};