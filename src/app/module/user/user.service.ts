import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { hashPassword } from "../../../shared/bcryptUtils";



const insertIntoDB = async (data: User): Promise<User> => {
    const hashedPassword = await hashPassword(data.password);


    const result = await prisma.user.create({
        data:{
            ...data,
            password:hashedPassword
        },
    });
    return result;
  };

  export const UserService = {
    insertIntoDB,
  };