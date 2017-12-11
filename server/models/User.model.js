const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: { type:String, required:true },
  nickname: { type:String, required:true },
  email: { type:String, required:true },
  photoUrl: { type:String, default:"https://cdn.vectorstock.com/i/thumb-large/71/60/kawaii-cartoon-face-vector-15307160.jpg"},
  position: { type: [ Number ], index: '2dsphere'},
  birthday: { type: Date },
  _liking: [ { categorie: { type: Schema.Types.ObjectId, ref: 'Category' },
                         rate: { type: Number, default: 1 }
                       } ],
  facebook: { id: String, token: String, name: String },
  password: { type: String },
  gender: { type: String, enum:[ 'male','female','none' ], default:'none'},
  role: { type: String, enum: [ 'particular','business' ], default: 'particular' },
  maxKilometers: { type: Number, default: 10 }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
