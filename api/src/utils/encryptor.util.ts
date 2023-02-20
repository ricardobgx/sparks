import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';

dotenv.config();

const EncryptorUtil = {
  hashValue(value: string) {
    const { SALT_ROUNDS } = process.env;

    const salt = bcrypt.genSaltSync(Number(SALT_ROUNDS));

    return bcrypt.hashSync(value, salt);
  },
  isEqualHashedValue(value: string, hashedValue: string) {
    return bcrypt.compareSync(value, hashedValue);
  },
};

export default EncryptorUtil;
