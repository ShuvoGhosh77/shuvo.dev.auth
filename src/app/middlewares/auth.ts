// import { NextFunction, Request, Response } from 'express';
// import httpStatus from 'http-status';
// import { Secret } from 'jsonwebtoken';

// import ApiError from '../../errors/ApiError';
// import { jwtHelpers } from '../../helpers/jwtHelpers';
// import config from '../../config';

// const auth =
//   (...requiredRoles: string[]) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       //get authorization token
//       const token = req.headers.authorization;
//       console.log(req.headers.authorization)
//       // if (!token) {
//       //   throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
//       // }
//       // // verify token
//       // let verifiedUser = null;

//       // verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

//       // req.user = verifiedUser; // role  , userid
//       // console.log(verifiedUser)

//       // // role diye guard korar jnno
//       // if (requiredRoles.length && !requiredRoles.includes(verifiedUser.Role)) {
//       //   return new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
//       // }
//       next();
//     } catch (error) {
//       next(error);
//     }
//   };

// export default auth;


// import { NextFunction, Request, Response } from 'express';
// import httpStatus from 'http-status';
// import { Secret } from 'jsonwebtoken';
// import config from '../../config';
// import ApiError from '../../errors/ApiError';
// import { jwtHelpers } from '../../helpers/jwtHelpers';

// const auth =
//   (...requiredRoles: string[]) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       //get authorization token
//       const token = req.headers.authorization;
//       console.log(req)
//       if (!token) {
//         throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
//       }
//       // verify token
//       let verifiedUser = null;

//       verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

//       req.user = verifiedUser; // role , userid
//      console.log(verifiedUser)
//       // role diye guard korar jnno
//       if (requiredRoles.length && !requiredRoles.includes(verifiedUser.Role)) {
//         throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
//       }
//       next();
//     } catch (error) {
//       next(error);
//     }
//   };

// export default auth;

import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

import { IAuthUser } from '../../interfaces/auth';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
    async (req: any, res: Response, next: NextFunction) => {
      return new Promise(async (resolve, reject) => {
        const token = req.headers.authorization;
        console.log(token)

        if (!token) {
          return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
        }

        const verifiedUser = jwtHelpers.verifyToken(token,config.jwt.secret as Secret);

        if (!verifiedUser) {
          return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
        }

        req.user = verifiedUser;

        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
          return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
        }

        resolve(verifiedUser);
      })
        .then(() => next())
        .catch((err) => next(err));
    };

export default auth;

