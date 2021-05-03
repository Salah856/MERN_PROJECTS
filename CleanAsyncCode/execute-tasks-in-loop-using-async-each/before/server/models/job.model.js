import mongoose from 'mongoose';
import Company from './company.model';
import {Schema} from 'mongoose';

const JobSchema = new mongoose.Schema({
  title : {
    type: String,
    required: true
  },
  _company: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Company
  }
});


export default mongoose.model('Job', JobSchema);

