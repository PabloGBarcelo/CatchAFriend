const express = require('express');
const Routes = express.Router();
const planController = require('../controllers/plan.controller');
const parser = require('../config/cloudinary.config');

Routes.get('/planUser/:id', planController.getPlansByUserId);

Routes.get('/plan/:id', planController.getPlanById);

Routes.post('/newplan', planController.newPlan);

Routes.post('/plan', planController.listPlan);

Routes.post('/plan/:id', planController.updatePlanById);

Routes.delete('/plan/:id', planController.removePlanById);

Routes.post('/plan/:planId/like/:userId', planController.planLikedByUser);

Routes.post('/plan/:planId/dislike/:userId', planController.planDislikedByUser);

Routes.post('/plan/:planId/cancel/:userId', planController.planCancelByUserOrOwner);

Routes.post('/plan/:planId/reject/:userId', planController.userRejectByOwner);

Routes.post('/plan/:planId/accept/:userId', planController.userAcceptByOwner);

Routes.post('/uploadPhoto', parser.single('image'), planController.uploadPhoto);

module.exports = Routes;
