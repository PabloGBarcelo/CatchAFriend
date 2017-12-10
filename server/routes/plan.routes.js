const express = require('express');
const Plan = require('../models/Plan.model');
const Routes = express.Router();
var _ = require('lodash');

ObjectId = require('mongodb').ObjectID;

Routes.post('/newplan', (req, res, next) => { // CHECKED
  console.log(req.body);
  const { title,
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
          street
         } = req.body;
  if (!title || !position || !datePlan || !_category || !description || !photo || !street) {
    console.log("FAIL");
    res.status(400).json({ message: 'Please, provide all fields' });
    return;
  }
  // No plans in the past
  if (datePlan < Date.now()){
    res.status(400).json({ message: 'Back to the past!? Incredible!' });
    return;
  }
  // No plans without 2 hours (check plan rush) (last minute plan)
  if (Math.abs(datePlan - Date.now()) /  3.6e6 < 2){
    res.status(400).json({ message: 'You cant make normal plan with less than two hour' });
    return;
  }
  // Need to find if exist a plan of this user inside the hour passed
    Plan.findOne({"datePlan": {"$gte": datePlan, "$lt": datePlan, "$eq": datePlan}}, '_id')
      .then(onePlan => {
        if (onePlan) {
          res.status(400).json({ message: 'You cant be in 2 plans on same hour! Are you god?' });
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
          street
        });
        return newPlan.save();
      })
      .then(newPlan => { res.status(200).json(newPlan); })
      .catch(e => {
          console.log(e);
          res.status(500).json({ message: 'Something went wrong' });
      });
    });

    Routes.post('/plan', (req, res) => { // CHECKED
      // Receive liking of user (categories in array), idUser, typeFilter, zone
      // Get all plans without filter (categories and subcategories)
      // MVP Later : db.collection.count()
      // db.collection.find().skip(20).limit(10) cursor.count()
      console.log("REQ.BODY");
      console.log(req.body);
      let search = {};
      const rush = req.body.rush; // Boolean
      const user = req.body.userId;
      const likings = req.body.likingUser.map(e => { return e.categorie; });
      const gender = [req.body.gender,'both'];
      const now = new Date();
      const rushNow = new Date();
            console.log(req.body.position);
      console.log(req.body.position);
      const position = [req.body.position[1],req.body.position[0]]; // lat and lon => lon and lat
      const distance = req.body.maxKilometers * 1000;

      switch(req.body.typeSearch){
        case "Confort":
        // Like category
          search['_category'] = { $in: likings };
        break;

        case "Explore":
          search['_category'] = { $nin: likings }; // likings its an array
        break;

        case "Random":
        break;

      }
      if (rush){
        // Search with less than 2 hours from now
        search['datePlan'] = { $gt: [ rushNow ] };
      } else {
        // Search normal, more than 2 hours from now
        search['datePlan'] = { $gt: [ now ] };
      }
      // and not in request, dislikes or rejected
      // In time
      search['status'] = 'running';
      search['_usersRequest'] = { $nin: [ user ] };
      search['_acceptRequest'] = { $nin: [ user ] };
      search['_dislikesId'] = { $nin: [ user ] };
      search['_rejectedId'] = { $nin: [ user ] };
      search['gender_allowed'] = { $in: gender };
      search['$nearSphere'] = { $geometry: {
                                              "type": "Point",
                                              "coordinates": position,
                                            },
                                            $maxDistance: distance
                                          };
      console.log("SEARCH");
      console.log(search);
      // Filter by Zone
      // add Filter by gender_allowed
      // add filter status
      // add Filter time
      Plan.find(search).limit(100)
            .exec(function(err, result){
                console.log(result);
            })
              .then(data => { res.status(200).json(_.shuffle(data).splice(0,5)); }) // get 100 results, shuffle and return 5
              .catch(err => { console.log(err);res.status(500).json({ message: 'Error listing'}); });
    });

    Routes.get('/plan/:id', (req, res, next) => { // CHECKED
      // Get plan by id
      Plan.findById(req.params.id)
              .then(data => { res.status(200).json(data);})
              .catch(err => { res.status(500).json({ message: 'Error listing'});});
    });

    Routes.post('/plan/:id', (req, res, next) => { // CHECKED
      // Get categorie by Id and Update
      Plan.findByIdAndUpdate(req.params.id,req.body)
              .then(data => { res.status(200).json(data); })
              .catch(err => { res.status(500).json({ message: 'Error updating'});});
    });

    Routes.delete('/plan/:id', (req, res, next) => { // CHECKED
      // Remove category
      Plan.findByIdAndRemove(req.params.id)
              .then(itemRemoved => { res.status(200).json(); })
              .catch(err => res.status(500).json({ message: 'Error removing'}));
    });

    // When somebody make like
    Routes.post('/plan/:planId/like/:userId', (req, res, next) => { // CHECKED
      Plan.findOneAndUpdate({"_id":req.params.planId,
                            "_usersRequest": { $nin:[ req.params.userId ] },
                            "_rejectedId": { $nin:[ req.params.userId ] },
                            "_dislikesId": { $nin:[ req.params.userId ] },
                             "_acceptRequest": { $nin:[ req.params.userId ] }},
                            {$push: {"_usersRequest": req.params.userId}})
          .then(planLiked => {
            if (!planLiked)
              res.status(500).json({ message: 'Plan executed in the past'});
            else
              res.status(200).json("Plan Liked"); })
          .catch(err => res.status(500).json({ message: 'Error Liking plan'}));
    });

    // When somebody make dislike
    Routes.post('/plan/:planId/dislike/:userId', (req, res, next) => { // CHECKED
      Plan.findOneAndUpdate({  "_id":req.params.planId,
                               "_usersRequest": { $nin:[ req.params.userId ] },
                               "_rejectedId": { $nin:[ req.params.userId ] },
                               "_dislikesId": { $nin:[ req.params.userId ] },
                               "_acceptRequest": { $nin:[ req.params.userId ] }},
                               { $push: {"_dislikesId": req.params.userId }})
          .then(planDisliked => {
            if (!planDisliked)
              res.status(500).json({ message: 'Plan executed in the past'});
            else
              res.status(200).json("Plan Disliked"); })
          .catch(err => res.status(500).json({ message: 'Error disliking plan'}));

    });

    // When a user accept a plan
    Routes.post('/plan/:planId/accept/:userId', (req, res, next) => { // CHECKED
      Plan.findOneAndUpdate({"_id":req.params.planId, "_usersRequest": req.params.userId },
                            { $push: {"_acceptRequest": req.params.userId },
                              $pull:{ "_usersRequest": req.params.userId }})
          .then(planAccepted => {
            if (!planAccepted)
              res.status(500).json({ message: 'No plan for Accept'});
            else
              res.status(200).json("Plan Accepted"); })
          .catch(err => res.status(500).json({ message: 'Error Accepting plan'}));

    });



module.exports = Routes;
