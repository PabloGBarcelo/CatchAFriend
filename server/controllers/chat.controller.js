const Chat = require('../models/Chat.model');
const ChatUser = require('../models/ChatUser.model');

module.exports.newChat = (req, res, next) => { // CHECKED
  const {
    planId,
    userId,
    status,
  } = req.body;
  if (!planId || !userId || !status) {
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
      res.status(500).json({
        message: 'Something went wrong'
      });
    });
};

module.exports.addMessage = (req, res, next) => { // CHECKED
  let senderId = req.body.data.senderId;
  let message = req.body.data.message;
  let planId = req.body.data.planId;
  if (!senderId || !message || !planId) {
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
      res.status(500).json({
        message: 'Something went wrong'
      });
    });
};

module.exports.getMessages = (req, res, next) => {
  // get all chats of planId
  Chat.find({
      planId: req.body.planId
    })
    .populate('senderId')
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error getting chat'
      });
    });
};

module.exports.getChats = (req, res, next) => {
  // get all chats of user
  ChatUser.find({
      userId: req.body.idUser, status:"in"
    })
    .populate('planId')
    .exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error getting chat'
      });
    });
};

module.exports.getAllChatsOfUserById =  (req, res, next) => {
  // get all chats of user
  ChatUser.findOne({
      userId: req.body.planId
    },{},{ sort:{ 'created_at':-1 }})
    .populate('planId')
    .exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error getting chat'
      });
    });
};
