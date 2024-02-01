import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import bcrypt from 'bcrypt';
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { hashPassword } from "../../../shared/bcryptUtils";



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

  const hashedPassword = await hashPassword(isUserExist.password);
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  if (
    isUserExist.password && isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { Email: email, Role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { email, Role },
    'Secret',
    36000
  );

  const refreshToken = jwtHelpers.createToken(
    { email, Role },
    'Secret',
    36000
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
      'Secret',
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { Email } = verifiedToken;

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
    'Secret',
    36000
  );

  return {
    accessToken: newAccessToken,
  };
};



export const AuthService = {
  loginUser,
  refreshToken
};