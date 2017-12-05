const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const chatSchema = new Schema({
  idEmitUser: { type:Schema.Types.ObjectId, required:true },
  idReceiveUser: { type:Schema.Types.ObjectId, required:true },
  message: { type:String, required:true },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
