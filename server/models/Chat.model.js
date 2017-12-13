const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const chatSchema = new Schema({
  senderId: { type:Schema.Types.ObjectId, ref:'User', required:true },
  planId: { type:Schema.Types.ObjectId, ref:'Plan', required:true },
  message: { type:String, required:true },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
