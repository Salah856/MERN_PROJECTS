import mongoose from 'mongoose';
import {Schema} from 'mongoose';

import Company from './company.model';
import Job from './job.model';

const ApplicationSchema = new mongoose.Schema({
  _company: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Company
  },
  _job : {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Job
  }
});

export default mongoose.model('Application', ApplicationSchema);
