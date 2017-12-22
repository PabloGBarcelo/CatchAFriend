const Category = require ('../models/Category.model');

module.exports.newCategory = (req, res, next) => { // CHECKED
  const { name,
          imgUrl,
          categoryFather,
          iconUrl
         } = req.body;
  if (!name || !imgUrl ) {
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
              res.status(500).json({ message: 'Something went wrong' });
          });
};

module.exports.listAllCategories = (req, res) => { // CHECKED
  // Get all categories without filter (categories and subcategories)
  Category.find({})
          .then(data => { res.status(200).json(data); })
          .catch(err => { console.log(err);res.status(500).json({ message: 'Error listing'}); });
};

module.exports.listCategoriesById = (req, res, next) => { // CHECKED
  // Get category by id
  Category.findById(req.params.id)
          .then(data => { res.status(200).json(data);})
          .catch(err => { res.status(500).json({ message: 'Error listing'});});
};

module.exports.updateCategorieById = (req, res, next) => { // CHECKED
  // Get categorie by Id and Update
  Category.findByIdAndUpdate(req.params.id,req.body)
          .then(data => { res.status(200).json(data);})
          .catch(err => { res.status(500).json({ message: 'Error listing'});});
};

module.exports.deleteCategoryById = (req, res, next) => { // CHECKED
  // Remove category
  Category.findByIdAndRemove(req.params.id)
          .then(itemRemoved => { res.status(200).json(); })
          .catch(err => res.status(500).json({ message: 'Error removing'}));
};
