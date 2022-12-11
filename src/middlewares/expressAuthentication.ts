import { Request } from 'express';
import { get } from 'lodash';
import * as jwt from 'jsonwebtoken';
import { CustomError } from 'config/CustomError';
import { EErrorMessages } from 'interfaces/EErrorMessages';

export const expressAuthentication = async (
  request: Request,
  securityName: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scopes?: string[]
  // eslint-disable-next-line consistent-return
): Promise<void> => {
  if (securityName === 'bearer') {
    const token = get(request, 'headers.authorization', '').replace(
      /^Bearer\s/,
      ''
    );

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(
          CustomError.authorization(EErrorMessages.FORBIDDEN_OPERATION, {
            message: 'No token provided',
          })
        );
      }

      jwt.verify(
        token,
        process.env.JWT_SECRET || '',
        (err: any, decoded: any) => {
          if (err) {
            reject(
              CustomError.authorization(EErrorMessages.FORBIDDEN_OPERATION, {
                message: 'Provided token has expired',
              })
            );
          } else {
            resolve(decoded._doc);
          }
        }
      );
    });
  }
};
