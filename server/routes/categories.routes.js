const express = require('express');
const Category = require ('../models/Category.model');
const Routes = express.Router();

Routes.post('/newcategories', (req, res, next) => {
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
  .then(newUser => {  res.status(200).json(); })
  .catch(e => {
      console.log(e);
      res.status(500).json({ message: 'Something went wrong' });
  });
});

module.exports = Routes;
