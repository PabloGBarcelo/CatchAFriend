const express = require('express');
const Chat = require('../models/Chat.model');
const ChatUser = require('../models/ChatUser.model');
const Routes = express.Router();

// Do what you have...
Routes.post('/newChat', (req, res, next) => { // CHECKED
  console.log(req.body);
  const {
    planId,
    userId,
    status,
  } = req.body;
  if (!planId || !userId || !status) {
    console.log("FAIL");
    res.status(400).json({
      message: 'Please, provide all fields'
    });
    return;
  }
  ChatUser.findOne({
      planId
    }, '_id')
    .then(category => {
      if (category) {
        res.status(400).json({
          message: 'The chat already exists'
        });
        return;
      }
      const newChat = new ChatUser({
        planId,
        userId,
        status,
      });
      return newChat.save();
    })
    .then(newChat => {
      res.status(200).json();
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({
        message: 'Something went wrong'
      });
    });
});

Routes.post('/addMessage', (req, res, next) => { // CHECKED
  console.log(req.body);
    console.log("PASANDO");
  let senderId = req.body.data.senderId;
  let message = req.body.data.message;
  let planId = req.body.data.planId;
    console.log("PASANDO");
    console.log(senderId,message,planId);
  if (!senderId || !message || !planId) {
    console.log("FAIL");
    res.status(400).json({
      message: 'Please, provide all fields'
    });
    return;
  }
  Chat.find()
    .then(() => {
      const newMessage = new Chat({
        senderId,
        message,
        planId,
      });
      return newMessage.save();
    })
    .then(newChat => {
      res.status(200).json();
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({
        message: 'Something went wrong'
      });
    });
});

Routes.post('/getMessages', (req, res, next) => {
  // get all chats of planId
  Chat.find({
      planId: req.body.planId
    })
    .populate('senderId')
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error getting chat'
      });
    });
});

Routes.post('/getChats', (req, res, next) => {
  // get all chats of user
  console.log("chats");
  ChatUser.find({
      userId: req.body.idUser, status:"in"
    })
    .populate('planId')
    .exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error getting chat'
      });
    });
});

Routes.post('/getLastMessage', (req, res, next) => {
  // get all chats of user
  console.log("chats");
  ChatUser.findOne({
      userId: req.body.planId
    },{},{ sort:{ 'created_at':-1 }})
    .populate('planId')
    .exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error getting chat'
      });
    });
});

module.exports = Routes;

// idEmitUser: { type:Schema.Types.ObjectId, required:true },
// idReceiveUser: { type:Schema.Types.ObjectId, required:true },
// message: { type:String, required:true },
