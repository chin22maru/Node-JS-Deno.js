const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imgUrl) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.imgUrl = imgUrl;
  }

  save() {
    const db = getDb();
    return db.collection('products')
      .insertOne(this)
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db    // // find retruns MongoDB Curser(a ptr to the result set of a query) not Promise
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(e => {
        console.log(e);
      });
  }

  static findById(prodId) {
    const db = getDb();
    
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectID(prodId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(e => {
        console.log(e);
      });
  }
}

module.exports = Product;
