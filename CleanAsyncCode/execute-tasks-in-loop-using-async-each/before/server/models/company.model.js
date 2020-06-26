import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  }
});

export default mongoose.model('Company', CompanySchema);
