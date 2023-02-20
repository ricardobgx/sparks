import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import AppError from '../errors/app.error';

dotenv.config();

const JWTUtil = {
  generateToken(data: any) {
    const { SECRET_KEY, EXPIRES_IN } = process.env;

    return jwt.sign(
      {
        data,
      },
      SECRET_KEY,
      { expiresIn: EXPIRES_IN },
    );
  },
  verifyToken(token): any {
    const { SECRET_KEY } = process.env;

    try {
      var decoded = jwt.verify(token, SECRET_KEY);

      return decoded;
    } catch (err) {
      throw new AppError('Unauthorized', 401);
    }
  },
};

export default JWTUtil;
