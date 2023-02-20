import { Prisma } from '@prisma/client';

export type ProductInsertParams =
  | (Prisma.Without<
      Prisma.ProductCreateInput,
      Prisma.ProductUncheckedCreateInput
    > &
      Prisma.ProductUncheckedCreateInput)
  | (Prisma.Without<
      Prisma.ProductUncheckedCreateInput,
      Prisma.ProductCreateInput
    > &
      Prisma.ProductCreateInput);

export type ProductFindParams = Prisma.ProductWhereInput;

export type ProductUpdateParams =
  | (Without<ProductUpdateInput, ProductUncheckedUpdateInput> &
      ProductUncheckedUpdateInput)
  | (Without<Prisma.ProductUncheckedUpdateInput, Prisma.ProductUpdateInput> &
      ProductUpdateInput);
