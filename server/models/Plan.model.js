const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const planSchema = new Schema({
  title: { type:String, required:true },
  position: { type:{ lat: Number,
                     lon: Number,
                     name: String },
                required: true },
  _owner: [ { type: Schema.Types.ObjectId, required: true, ref: 'User' } ],
  datePlan: { type: Date, required: true },
  _usersRequest: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  _acceptRequest: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  _category: [ { type: Schema.Types.ObjectId, required: true, ref: 'Category' } ],
  _dislikesId: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  _rejectedId: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  gender_allowed: { type: String, enum: [ 'male','female','both' ], default: 'both' },
  description: { type: String, required: true },
  photo: [{ type: String, required: true }],
  zone: { type: String, enum: [ 'plan','relation','rush' ], default: 'plan' },
  status: { type: String, enum: ['cancelled','running','complete']  ,default: 'running' },
  money: { type: Number, default:'0'},
  transport: { type: String, enum:['Take You!','You get me?','We Stay There'], default: 'We Stay There'},
  maxPeople: { type: Number, default:1 }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;
