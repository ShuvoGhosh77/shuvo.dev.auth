import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse } from "./auth.interface";
import { AuthService } from "./auth.service";
import config from "../../../config";


const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData);

    const { refreshToken } = result;
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully !',
      data: result,
    });
  });

  const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
  
    const result = await AuthService.refreshToken(refreshToken);
    console.log(result)
  
 
    res.cookie('refreshToken', refreshToken);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully !',
      data: result,
    });
  });

  export const AuthController ={
    loginUser,
    refreshToken
  } 