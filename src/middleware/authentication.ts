import * as boom from 'boom';
import * as jwt from 'jsonwebtoken';
import { Context } from 'koa';
import * as config from '../config';
import * as userRepo from '../repositories/user';

const authentication = async (ctx: Context, next: () => void) => {
  const token = ctx.header.authorization;
  const platform = ctx.header.platform;
  const appVersion = parseFloat(ctx.header.appversion);
  if (!token) {
    throw boom.unauthorized();
  } else {
    try {
      if (!platform || !appVersion) {
        throw boom.forbidden('Newer version of application is available please contact administrator');
      } else if (platform === 'android' && config.default.appVersion > appVersion) {
        throw boom.forbidden('Newer version of application is available please contact administrator');
      }

      const decoded: any = jwt.verify(token, config.default.tokenSecret);
      const savedUser = await userRepo.findById(decoded.id);
      let dbUser = {};
      if (savedUser) {
        dbUser = savedUser.get({ plain: true });
      }
      ctx.state.user = {
        userId: decoded.id,
        roles: decoded.roles,
        ...dbUser
      };
    } catch (e) {
      throw boom.unauthorized();
    }
  }
  await next();
};

export default authentication;
