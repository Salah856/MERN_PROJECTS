import express from 'express';
import asyncDemoCtrl  from '../controllers/async_demo.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/series')
  .get(asyncDemoCtrl.seriesDemo);

router.route('/waterfall')
  .get(asyncDemoCtrl.waterfallDemo);

export default router;
