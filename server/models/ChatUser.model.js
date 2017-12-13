const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const chatUserSchema = new Schema({
  planId: { type:Schema.Types.ObjectId, required:true, ref:'Plan' },
  userId: { type:Schema.Types.ObjectId, required:true, ref:'User' },
  status: { type:String, enum:['in','out'], default:'in' },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const ChatUser = mongoose.model('ChatUser', chatUserSchema);
module.exports = ChatUser;
