import { notFound } from 'boom';
import * as Boom from 'boom';
import { Context } from 'koa';
import * as compose from 'koa-compose';
import * as Joi from 'joi';
import config from '../config';

const isProduction = config.env === 'production';
/**
 * Return middleware that handle exceptions in Koa.
 * Dispose to the first middleware.
 *
 * @return {function} Koa middleware.
 */
const handler = async (ctx: Context, next: () => void) => {
  try {
    await next();
    // if (!ctx.state.data) {
    //   ctx.redirect('/');
    // }
  } catch (err) {
    let metaData;

    if (err.isJoi) {
      metaData = handleJoiError(err);
    } else if (err.isBoom) {
      metaData = handleBoomError(err);
    } else {
      metaData = handleDefaultError(err);
    }
    ctx.status = +metaData.status;
    ctx.body = {
      meta: metaData,
    };
    ctx.log.error(err);
  }
};

const handleBoomError = (err: Boom) => {
  return {
    status: +err.output.statusCode,
    message: err.message,
  };
};
const handleJoiError = (err: Joi.ValidationError) => {
  return {
    status: 400,
    message: err.details[0].message,
  };
};

const handleDefaultError = (err: any) => {
  return {
    status: +err.status || 500,
    message: err.message || 'error.internal_server',
  };
};

export default () => compose([handler]);
