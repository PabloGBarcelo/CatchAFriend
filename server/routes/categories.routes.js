const express = require('express');
const Routes = express.Router();
const categoriesController = require ('../controllers/categories.controller');
// ALL API WORKING

Routes.post('/newcategories', categoriesController.newCategory);

Routes.get('/categories', categoriesController.listAllCategories);

Routes.get('/categories/:id', categoriesController.listCategoriesById);

Routes.post('/categories/:id', categoriesController.updateCategorieById);

Routes.delete('/categories/:id', categoriesController.deleteCategoryById);

module.exports = Routes;
