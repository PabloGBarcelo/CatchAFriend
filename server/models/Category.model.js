const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const categorySchema = new Schema({
  name: { type:String, required:true },
  imgUrl: { type:String, required:true },
  _categoryFather: [{ type: Schema.Types.ObjectId }],
  iconUrl: { type:String, default:"" }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
