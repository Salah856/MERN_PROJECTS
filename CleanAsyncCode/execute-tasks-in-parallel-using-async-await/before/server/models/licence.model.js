import mongoose from 'mongoose';
import {Schema} from 'mongoose';

import Application from './application.model'

const LicenceSchema = new mongoose.Schema({
  name : {
    type : String,
    required: true
  },
  _application: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Application
  }
});

export default mongoose.model('Licence', LicenceSchema);
