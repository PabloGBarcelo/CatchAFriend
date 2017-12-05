const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: { type:String, required:true },
  nickname: { type:String, required:true },
  photoUrl: { type:String, default:"" },
  // CHECK USE ARRAY
  position: { type:{ lat: Number,
                     lon: Number },
                required: true },
  birthday: { type: Date, required: true },
  _liking: [ { categorie: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
                         rate: { type: Number, default: 1 }
                       } ],
  facebookId: String,
  password: { type: String, required: true },
  gender: { type: String, enum:[ 'male','female' ]},
  role: { type: String, enum: [ 'particular','business' ], default: 'particular' }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
