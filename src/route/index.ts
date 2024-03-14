import * as compose from 'koa-compose';
import * as Router from 'koa-router';
import { methodNotAllowed, notImplemented } from 'boom';
import ping from './ping';
import auth from './auth';
import file from './file';
import listOfValue from './list-of-value';
import user from './user';
import department from './department';
import officeLocation from './office-location';
import group from './group';
import role from './role';
import dashboard from './dashboard';
import application from './application';
import applicationExecution from './application-execution';
import lookup from './lookup';
import report from './report';
import userLocationTrail from './user-location-trail';
import config from './config';

const router = new Router({
  prefix: '/api/v1',
});

const routes = router.routes();
const allowedMethods = router.allowedMethods({
  throw: true,
  methodNotAllowed: () => methodNotAllowed(),
  notImplemented: () => notImplemented(),
});
const routesToExport = [
  routes,
  // allowedMethods,
  ping,
  auth,
  file,
  listOfValue,
  user,
  department,
  officeLocation,
  group,
  role,
  dashboard,
  application,
  applicationExecution,
  lookup,
  report,
  userLocationTrail,
  config
];

export default () => compose(routesToExport);
