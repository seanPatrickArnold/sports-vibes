// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'tag_product',
  foreignKey: 'product_id'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'tag_product',
  foreignKey: 'tag_id'
});

ProductTag.belongsTo(Product, {
  foreignKey: 'product_id',
  onDelete: 'SET NULL'
});

ProductTag.belongsTo(Tag, {
  foreignKey: 'tag_id',
  onDelete: 'SET NULL'
});

Product.hasMany(ProductTag, {
  foreignKey: 'product_id'
});

Tag.hasMany(ProductTag, {
  foreignKey: 'tag_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
