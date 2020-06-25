import express from 'express';
import asyncAwaitCtrl from '../controllers/async_await.controller.js';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/series')
    .get(asyncAwaitCtrl.seriesDemo);

router.route('/parallel')
  .get(asyncAwaitCtrl.parallelDemo);

export default router;
