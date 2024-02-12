import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";

import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../../config";

import { isPasswordMatched } from "../../../helpers/comparePassword";


const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { Email, password } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: {
      Email
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { Email: email, Role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { email, Role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { email, Role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};


const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { Email } = verifiedToken;
  console.log(Email)

  const isUserExist = await prisma.user.findUnique({
    where: {
      Email
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.Email,
      role: isUserExist.Role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   //verify token
//   // invalid token - synchronous
//   let verifiedToken = null;
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret
//     );
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }

//   const { Email } = verifiedToken;

//   // tumi delete hye gso  kintu tumar refresh token ase
//   // checking deleted user's refresh token

//   const isUserExist = await prisma.user.findUnique({
//     where: {
//       Email
//     },
//   });
// console.log(isUserExist)
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   //generate new token

//   const newAccessToken = jwtHelpers.createToken(
//     {
//       id: isUserExist.id,
//       role: isUserExist.Role,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );

//   return {
//     accessToken: newAccessToken,
//   };
// };


export const AuthService = {
  loginUser,
  refreshToken
};