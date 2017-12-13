const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const chatUserSchema = new Schema({
  idChat: { type:Schema.Types.ObjectId, required:true, Ref:'Chat' },
  userId: { type:Schema.Types.ObjectId, required:true, Ref:'User' },
  status: { type:String, enum:['in','out'], default:'in' },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const ChatUser = mongoose.model('ChatUser', chatUserSchema);
module.exports = Chat;
