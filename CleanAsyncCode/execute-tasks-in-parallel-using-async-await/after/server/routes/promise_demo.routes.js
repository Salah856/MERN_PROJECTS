import express from 'express';
import promiseDemoCtrl from '../controllers/promise_demo.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/chaining')
    .get(promiseDemoCtrl.promiseChaining);

router.route('/parallel')
  .get(promiseDemoCtrl.parallelDemo);

export default router;
