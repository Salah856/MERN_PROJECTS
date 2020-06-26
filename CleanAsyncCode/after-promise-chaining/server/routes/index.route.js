import express from 'express';

import asyncDemoRoutes from './async_demo.routes';
import promiseRoutes from './promise_demo.routes.js';

const router = express.Router();

router.use('/async',asyncDemoRoutes);
router.use('/promise', promiseRoutes);

export default router;
