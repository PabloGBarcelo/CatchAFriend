require('dotenv').config();
const express = require('express');
const Plan = require('../models/Plan.model');
const Routes = express.Router();
const ChatUser = require('../models/Chat.model');
const nodemailer = require('nodemailer');
// var upload = multer({
//   dest: 'public/images/uploads/'
// });
var _ = require('lodash');
var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
var multer = require('multer');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'catchafriend',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(undefined, 'my-file-name');
  }
});

var parser = multer({ storage: storage });

ObjectId = require('mongodb').ObjectID;

Routes.post('/newplan', (req, res, next) => { // CHECKED
  console.log(req.body);
  const {
    title,
    position,
    _owner,
    datePlan,
    _usersRequest,
    _category,
    _dislikesId,
    _rejectedId,
    gender_allowed,
    description,
    photo,
    zone,
    status,
    maxPeople,
    street,
    money
  } = req.body;
  if (!title || !position || !datePlan || !_category || !description || !photo || !street) {
    console.log("FAIL");
    res.status(400).json({
      message: 'Please, provide all fields'
    });
    return;
  }
  // No plans in the past
  if (datePlan < Date.now()) {
    res.status(400).json({
      message: 'Back to the past!? Incredible!'
    });
    return;
  }
  // No plans without 2 hours (check plan rush) (last minute plan)
  if (Math.abs(datePlan - Date.now()) / 3.6e6 < 2) {
    res.status(400).json({
      message: 'You cant make normal plan with less than two hour'
    });
    return;
  }
  // Need to find if exist a plan of this user inside the hour passed
  Plan.findOne({
      "datePlan": {
        "$gte": datePlan,
        "$lt": datePlan,
        "$eq": datePlan
      }
    }, '_id')
    .then(onePlan => {
      if (onePlan) {
        res.status(400).json({
          message: 'You cant be in 2 plans on same hour! Are you god?'
        });
        return;
      }
      const newPlan = new Plan({
        title,
        position,
        _owner,
        datePlan,
        _usersRequest,
        _category,
        _dislikesId,
        _rejectedId,
        gender_allowed,
        description,
        photo,
        zone,
        status,
        maxPeople,
        street,
        money
      });
      return newPlan.save();
    })
    .then(newPlan => {
      res.status(200).json(newPlan);
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({
        message: 'Something went wrong'
      });
    });
});

Routes.post('/plan', (req, res) => { // CHECKED
  console.log("REQ.BODY");
  console.log(req.body);
  let search = {};
  const rush = req.body.rush; // Boolean
  const user = req.body.userId;
  const likings = req.body.likingUser.map(e => {
    return e.categorie;
  });
  const gender = [req.body.gender, 'both'];
  const now = new Date();
  let rushNow = new Date();
  rushNow = rushNow.setHours(rushNow.getHours() + 2); // plans in less than 2 hours
  console.log("rushnow");
  console.log(rushNow);
  const position = [req.body.position[0], req.body.position[1]]; // lat and lon
  const distance = req.body.maxKilometers * 1000;
  console.log("LLEGUE1");

  switch (req.body.typeSearch) {
    case "Confort":
      // Like category
      search['_category'] = {
        $in: likings
      };
      break;

    case "Explore":
      search['_category'] = {
        $nin: likings
      }; // likings its an array
      break;

    case "Random":
      break;

  }
  if (rush) {
    // Search with less than 2 hours from now
    search['datePlan'] = {
      $lte: [rushNow]
    };
  } else {
    // Search normal, more than 2 hours from now
    search['datePlan'] = {
      $gt: [now]
    };
  }
  // and not in request, dislikes or rejected
  // In time
  search['status'] = 'running';
  search['_owner'] = { $nin: [ user ] };
  search['_usersRequest'] = {
    $nin: [user]
  };
  search['_acceptRequest'] = {
    $nin: [user]
  };
  search['_dislikesId'] = {
    $nin: [user]
  };
  search['_rejectedId'] = {
    $nin: [user]
  };
  search['gender_allowed'] = {
    $in: gender
  };
  //search['_liking'] = { rate: { $gt: 0 }},
  search['position'] = {
    $nearSphere: {
      $geometry: {
        "type": "Point",
        "coordinates": position,
      },
      $maxDistance: distance
    }
  };
  console.log("SEARCH");
  console.log(search);
  // Filter by Zone
  // add Filter by gender_allowed
  // add filter status
  // add Filter time
  console.log("LLEGUE");
  Plan.find(search).limit(100)
    .populate("_owner")
    .exec(function(err, result) {
      console.log(result);
    })
    .then(data => {
      res.status(200).json(_.shuffle(data).splice(0, 5));
    }) // get 100 results, shuffle and return 5
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error listing'
      });
    });
});

Routes.get('/planUser/:id', (req, res, next) => { // CHECKED
  let user = req.params.id;
  console.log("USER ID");
  console.log(user);
  let search = {
    $or: [{
      "_acceptRequest": {
        $in: [user]
      }
    }, {
      "_usersRequest": {
        $in: [user]
      }
    }, {
      "_rejectedId": {
        $in: [user]
      }
    },{
        "_owner": {
        $in: [user]
      }
  }]
};
  console.log(search);
  Plan.find(search)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error listing'
      });
    });
});

Routes.get('/plan/:id', (req, res, next) => { // CHECKED
  // Get plan by id
  Plan.findById(req.params.id)
    .populate("_owner")
    .populate("_usersRequest")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error listing'
      });
    });
});

Routes.post('/plan/:id', (req, res, next) => { // CHECKED
  // Get plan  by Id and Update
  Plan.findByIdAndUpdate(req.params.id, req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error updating'
      });
    });
});

Routes.delete('/plan/:id', (req, res, next) => { // CHECKED
  // Remove category
  Plan.findByIdAndRemove(req.params.id)
    .then(itemRemoved => {
      res.status(200).json();
    })
    .catch(err => res.status(500).json({
      message: 'Error removing'
    }));
});

// When somebody make like
Routes.post('/plan/:planId/like/:userId', (req, res, next) => { // CHECKED
  Plan.findOneAndUpdate({
      "_id": req.params.planId,
      "_usersRequest": {
        $nin: [req.params.userId]
      },
      "_rejectedId": {
        $nin: [req.params.userId]
      },
      "_dislikesId": {
        $nin: [req.params.userId]
      },
      "_acceptRequest": {
        $nin: [req.params.userId]
      }
    }, {
      $push: {
        "_usersRequest": req.params.userId
      }
    })
    .then(planLiked => {
      if (!planLiked)
        res.status(500).json({
          message: 'Plan executed in the past'
        });
      else{
        Plan.findById(req.params.planId)
            .populate("_owner")
            .then(result => {
              console.log(result);
              // Send email to user
              sendEmail(result._owner[0].email,'You have a new request in CatchAFriend ✔!');
            })
            .catch(e => console.log(e));
        res.status(200).json("Plan Liked");
    }})
    .catch(err => res.status(500).json({
      message: 'Error Liking plan'
    }));
});

// When somebody make dislike
Routes.post('/plan/:planId/dislike/:userId', (req, res, next) => { // CHECKED
  Plan.findOneAndUpdate({
      "_id": req.params.planId,
      "_usersRequest": {
        $nin: [req.params.userId]
      },
      "_rejectedId": {
        $nin: [req.params.userId]
      },
      "_dislikesId": {
        $nin: [req.params.userId]
      },
      "_acceptRequest": {
        $nin: [req.params.userId]
      }
    }, {
      $push: {
        "_dislikesId": req.params.userId
      }
    })
    .then(planDisliked => {
      if (!planDisliked)
        res.status(500).json({
          message: 'Plan executed in the past'
        });
      else
        res.status(200).json("Plan Disliked");
    })
    .catch(err => res.status(500).json({
      message: 'Error disliking plan'
    }));

});

// Reject by owner or cancel by person interested
Routes.post('/plan/:planId/cancel/:userId', (req, res, next) => {
  console.log("Entre");
  Plan.findOneAndUpdate({
      "_id": req.params.planId,
      "_usersRequest": req.params.userId
    }, {
      $push: {
        "_dislikesId": req.params.userId
      },
      $pull: {
        "_usersRequest": req.params.userId
      }
    }, {
      new: true
    })
    .then(planAccepted => {
      if (!planAccepted)
        res.status(500).json({
          message: 'No plan for Accept'
        });
      else
        res.status(200).json(planAccepted);
    })
    .catch(err => res.status(500).json({
      message: 'Error Rejecting plan'
    }));
});
// When a user accept a plan
Routes.post('/plan/:planId/accept/:userId', (req, res, next) => { // CHECKED
  Plan.findOneAndUpdate({
      "_id": req.params.planId,
      "_usersRequest": req.params.userId
    }, {
      $push: {
        "_acceptRequest": req.params.userId
      },
      $pull: {
        "_usersRequest": req.params.userId
      }
    })
    .then(planAccepted => {
      if (!planAccepted)
        res.status(500).json({
          message: 'No plan for Accept'
        });
      else {
        // SEND NODEMAIL HERE

        // Insert new ChatUser of owner and
        ChatUser.find({ planId:req.params.planId,
                        userId:result._owner._id})
                .then(result =>{
                  // if not exist, insert in bbdd own chat
                  if (!result){
                    let newChatUser = new ChatUser({
                      planId:req.params.planId,
                      userId:result._owner._id,
                      status:"in"
                    });
                      newChatUser.save();
                  }
                });
        // Insert accepted user new ChatUser to plan
        let newChatUser = new ChatUser({
          planId:req.params.planId,
          userId:req.params.userId,
          status:"in"
        });
          newChatUser.save();

        //Search email and send
        User.findById(req.params.userId)
            .then(result => {
              console.log(result);
              // Send email to user
              sendEmail(result.email,'You have a new plan accepted in CatchAFriend ✔!');
            })
            .catch(e => console.log(e));
        res.status(200).json("Plan Accepted");
      }
    })
    .catch(err => res.status(500).json({
      message: 'Error Accepting plan'
    }));

});

Routes.post('/uploadPhoto', parser.single('image'), (req, res, next) => {
  if (req.file) {
    res.status(200).json(req.file.url);
  } else {
    res.status(500).json("some error");
  }
  console.log(req.file);
});

sendEmail = function(userEmail,subject) {
  console.log(userEmail);
  if (typeof(userEmail) != "undefined") {
    console.log('Hello!');
    nodemailer.createTestAccount((err, account) => {

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'srv08.mihosting.net',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.USER_EMAIL, // generated ethereal user
          pass: process.env.PASS_EMAIL // generated ethereal password
        }
      });

      // setup email data with unicode symbols
      let mailOptions = {
        from: '"CatchAFriend 👻" <team@catchafriend.com>', // sender address
        to: userEmail, // list of receivers
        subject: subject, // Subject line
        text: 'Congratulations! you have friends waiting for you!!', // plain text body
        html: '<b>Congrats! You have friends waiting for you!!!, click here: <a href="http://localhost:4200/myplans">Go to my plans</a></b>' // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
    });
  }
};
module.exports = Routes;
