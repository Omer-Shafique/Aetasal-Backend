import { Context } from 'koa';
import * as Joi from 'joi';

import { validate } from '../validations/index';
import { IPaginationOpts } from '../interface/request';
import PaginationDefaults from '../constants/pagination';

export default async (ctx: Context, next: () => void) => {
  const pagination: IPaginationOpts = {
    limit: ctx.query.limit,
    offset: ctx.query.offset,
    sortBy: ctx.query.sortBy,
    sortOrder: ctx.query.sortOrder
  };

  const schema: Joi.SchemaMap = {
    // Notes for pageSize and offset:
    // Check for number, if it isn't, mark the rest as empty (Try).
    // Then if in any case the value is not set, set it to default (Default).
    limit: Joi.alternatives()
      .try([Joi.number().integer(), Joi.empty(Joi.any())])
      .default(PaginationDefaults.limit),
    offset: Joi.alternatives()
      .try([Joi.number().integer(), Joi.empty(Joi.any())])
      .default(PaginationDefaults.offset),
    sortBy: Joi.string()
      .trim()
      .empty('')
      .default(PaginationDefaults.sortBy),
    sortOrder: Joi.string()
      .trim()
      .empty('')
      .default(PaginationDefaults.sortOrder)
  };
  // @ts-ignore
  ctx.pagination = await validate(pagination, schema);

  // On some APIs, we allow pageSize to be ignored. It can be done by setting
  // pageSize to a negative value.
  // @ts-ignore
  ctx.pagination.all = ctx.pagination.limit < 0;

  // If sort order from payload has value other than [asc, desc]
  // Replace it with asc
  if (
    // @ts-ignore
    ctx.pagination.sortOrder &&
    // @ts-ignore
    ctx.pagination.sortOrder !== 'asc' &&
    // @ts-ignore
    ctx.pagination.sortOrder !== 'desc'
  ) {
    // @ts-ignore
    ctx.pagination.sortOrder = 'asc';
  }

  
  
  // If pageSize is to be ignored, always set pageSize to -1 for consistency.
  // @ts-ignore
  if (ctx.pagination.all) {
    // @ts-ignore
    ctx.pagination.limit = -1;
    // @ts-ignore
    ctx.pagination.offset = 0;
  }

  // We haven't added .positive() validation because we don't want it to cause
  // any error
  // @ts-ignore
  if (ctx.pagination.offset < 0) {
    // @ts-ignore
    ctx.pagination.offset = 0;
  }
  await next();
};
