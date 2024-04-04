// import * as Router from 'koa-router';
// import * as Koa from 'koa';
// import * as cors from '@koa/cors'; // Import CORS middleware
// import * as ctrl from '../controller/dashboard';
// import authentication from '../middleware/authentication';
// import authorization from '../middleware/authorization';
// import { Role } from '../enum/role';

// const app = new Koa();
// const router = new Router({
//   prefix: `/api/dashboard`,
// });

// // Enable CORS middleware
// app.use(cors());

// // Authentication and authorization middleware
// app.use(authentication);
// app.use(authorization(false, [Role.SUPER_ADMIN]));

// router.get('/admin/statistics', ctrl.getAdminDashboardStatistics);

// app.use(router.routes());
// app.use(router.allowedMethods());

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// export default router.routes();

import * as Router from 'koa-router';
import * as ctrl from '../controller/dashboard';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';

const router = new Router({
  prefix: `/api/dashboard`,
});

router.use(authentication); 
router.use(authorization()); 
// router.use(authorization(false, [Role.SUPER_ADMIN])); 

router.get('/admin/statistics', ctrl.getAdminDashboardStatistics);


export default router.routes();
