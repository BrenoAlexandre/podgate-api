import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import logger from '../config/logger';

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  const opts = { ...options, algorithm: 'HS256' } as SignOptions;
  return jwt.sign(object, process.env.JWT_SECRET as Secret, opts);
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    logger.error(e);
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}
