import { Context } from 'koa';
import * as Joi from 'joi';

import { validate } from '../validations/index';
import { IPaginationOpts } from '../interface/request';
import PaginationDefaults from '../constants/pagination';

// Extend the Context interface to include the pagination property
declare module 'koa' {
  interface Context {
    pagination: IPaginationOpts;
  }
}

export default async (ctx: Context, next: () => void) => {
  const pagination: IPaginationOpts = {
    limit: ctx.query.limit,
    offset: ctx.query.offset,
    sortBy: ctx.query.sortBy,
    sortOrder: ctx.query.sortOrder
  };

  //@ts-ignore
  const schema: Joi.ObjectSchema<IPaginationOpts> = Joi.object<IPaginationOpts>({
    limit: Joi.number().integer().default(PaginationDefaults.limit),
    offset: Joi.number().integer().default(PaginationDefaults.offset),
    sortBy: Joi.string().trim().empty('').default(PaginationDefaults.sortBy),
    sortOrder: Joi.string().trim().empty('').default(PaginationDefaults.sortOrder)
  });

  try {
    ctx.pagination = await validate(pagination, schema);
    ctx.pagination.all = ctx.pagination.limit < 0;

    if (ctx.pagination.sortOrder && !['asc', 'desc'].includes(ctx.pagination.sortOrder)) {
      ctx.pagination.sortOrder = 'asc';
    }

    if (ctx.pagination.all) {
      ctx.pagination.limit = -1;
      ctx.pagination.offset = 0;
    }

    if (ctx.pagination.offset < 0) {
      ctx.pagination.offset = 0;
    }

    await next();
  } catch (error) {
    // Handle validation error
    console.error('Validation error:', error);
    ctx.throw(400, 'Validation error');
  }
};