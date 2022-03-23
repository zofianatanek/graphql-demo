import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const formatNameMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  return value?.toUpperCase();
};