const express = require('express');
const Category = require ('../models/Category.model');
const Routes = express.Router();
// ALL API WORKING
Routes.post('/newcategories', (req, res, next) => { // CHECKED
  console.log(req.body);
  const { name,
          imgUrl,
          categoryFather,
          iconUrl
         } = req.body;
  if (!name || !imgUrl ) {
    console.log("FAIL");
    res.status(400).json({ message: 'Please, provide all fields' });
    return;
  }
  Category.findOne({ name }, '_id')
          .then(category => {
            if (category) {
              res.status(400).json({ message: 'The categorie already exists' });
              return;
            }
            const newCategory = new Category({
              name,
              imgUrl,
              categoryFather,
              iconUrl
            });
            return newCategory.save();
          })
          .then(newUser => { res.status(200).json(); })
          .catch(e => {
              console.log(e);
              res.status(500).json({ message: 'Something went wrong' });
          });
});

Routes.get('/categories', (req, res) => { // CHECKED
  // Get all categories without filter (categories and subcategories)
  Category.find({})
          .then(data => { res.status(200).json(data); })
          .catch(err => { console.log(err);res.status(500).json({ message: 'Error listing'}); });
});

Routes.get('/categories/:id', (req, res, next) => { // CHECKED
  // Get category by id
  Category.findById(req.params.id)
          .then(data => { res.status(200).json(data);})
          .catch(err => { res.status(500).json({ message: 'Error listing'});});
});

Routes.post('/categories/:id', (req, res, next) => { // CHECKED
  // Get categorie by Id and Update
  Category.findByIdAndUpdate(req.params.id,req.body)
          .then(data => { res.status(200).json(data);})
          .catch(err => { res.status(500).json({ message: 'Error listing'});});
});

Routes.delete('/categories/:id', (req, res, next) => { // CHECKED
  // Remove category
  Category.findByIdAndRemove(req.params.id)
          .then(itemRemoved => { res.status(200).json(); })
          .catch(err => res.status(500).json({ message: 'Error removing'}));
});

module.exports = Routes;
