const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imgUrl, id, userId) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.imgUrl = imgUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();

    let dbOps;
    if(this._id){
      // update the product
      dbOps = db.collection('products').updateOne({_id: this._id}, {$set: this});
    }
    else{
      dbOps = db.collection('products').insertOne(this);
    }

    return dbOps
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
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(e => {
        console.log(e);
      });
  }

  static deleteById(prodId){
    const db = getDb();

     return db.collection('products')
      .deleteOne({_id: new mongodb.ObjectId(prodId)})
      .then(res => {
        console.log('Deleted!');
      })
      .catch(e => {
        console.log(e);
      })
  }

}

module.exports = Product;
