const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imgUrl){
    this.title = title;
    this.description = description;
    this.price = price;
    this.imgUrl = imgUrl;
  }

  save(){
    const db = getDb();

    return db.collection('products')
      .insertOne(this)
      .then( res => {
        console.log(res);
      })
      .catch( e => {
        console.log(e);
      });
  }

}


module.exports = Product;