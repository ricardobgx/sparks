import { Prisma } from '@prisma/client';

export type UserInsertParams =
  | (Prisma.Without<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput> &
      Prisma.UserUncheckedCreateInput)
  | (Prisma.Without<Prisma.UserUncheckedCreateInput, Prisma.UserCreateInput> &
      Prisma.UserCreateInput);

export type UserFindParams = Prisma.UserWhereInput;

export type UserUpdateParams =
  | (Without<UserUpdateInput, UserUncheckedUpdateInput> &
      UserUncheckedUpdateInput)
  | (Without<Prisma.UserUncheckedUpdateInput, Prisma.UserUpdateInput> &
      UserUpdateInput);

export type Credentials = {
  email: string;
  password: string;
};
