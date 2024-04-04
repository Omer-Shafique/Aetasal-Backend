import * as boom from 'boom';
import * as jwt from 'jsonwebtoken';
import { Context } from 'koa';
import * as config from '../config';
import * as userRepo from '../repositories/user';
import * as _ from 'lodash';


const authentication = async (ctx: Context, next: () => Promise<any>) => {
  const token = ctx.header.authorization;
  const platform = ctx.header.platform;
  const appVersion = parseFloat(ctx.header.appversion);
  
  try {
    // Check if token exists
    if (!token) {
      throw boom.unauthorized('Token is missing');
    }
    

    if (!platform || !appVersion) {
      throw boom.forbidden('Newer version of application is available. Please contact administrator.');
    } else if (platform === 'android' && config.default.appVersion > appVersion) {
      throw boom.forbidden('Newer version of application is available. Please contact administrator.');
    }
    
    // Verify token
    const decoded: any = jwt.verify(token, config.default.tokenSecret);
    
    // Retrieve user from database
    const savedUser = await userRepo.findById(decoded.id);
    
    // Check if user exists
    if (!savedUser) {
      throw boom.unauthorized('User not found');
    }
    

    ctx.state.user = {
  userId: decoded.id,
  roles: decoded.roles, 
  ...(savedUser ? savedUser.get({ plain: true }) : {}) 
};

  } catch (error) {
    // Handle errors
    if (boom.isBoom(error)) {
      throw error;
    } else {
      throw boom.badImplementation('Internal Server Error');
    }
  }
  
  await next();
};

export default authentication;