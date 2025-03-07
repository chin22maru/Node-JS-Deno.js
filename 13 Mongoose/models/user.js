const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
        { 
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            }, 
            qty: {
                type: Number,
                required: true,
            } 
        }
    ] // array of documents
  }
});

userSchema.methods.addToCart = function(product){

    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    })

    let newQty = 1;
    const updatedCartItems = [...this.cart.items];

    if(cartProductIndex >=0 ){
        newQty = this.cart.items[cartProductIndex].qty + 1;
        updatedCartItems[cartProductIndex].qty = newQty;
    }else{
        updatedCartItems.push({productId: product._id, qty: newQty})
    }

    const updatedCart = {items: updatedCartItems};
    this.cart = updatedCart;

    return this.save();
}

userSchema.methods.removeFromCart = function(prodId){

    const updatedCartItems = this.cart.items.filter( item => {
        return item.productId.toString() !== prodId.toString()
    });

    this.cart.items = updatedCartItems;

    return this.save();
}

userSchema.methods.clearCart = function(){
    this.cart = { items: []};
    return this.save();
}


module.exports = mongoose.model('User', userSchema);



// const mongodb = require('mongodb')
// const getDb = require('../util/database').getDb;

// class User{
//     constructor(username, email, cart){
//         this.name= username;
//         this.email = email;
//         this.cart = cart; // { items: [] }
//     }

//     save(){
//         const db = getDb();
//         return db.collection('users').insertOne(this);
//     }

//     addToCart(product){
//         const cartProductIndex = this.cart.items.findIndex(cp => {
//             return cp.productId.toString() === product._id.toString();
//         })

//         let newQty = 1;
//         const updatedCartItems = [...this.cart.items];

//         if(cartProductIndex >=0 ){
//             newQty = this.cart.items[cartProductIndex].qty + 1;
//             updatedCartItems[cartProductIndex].qty = newQty;
//         }else{
//             updatedCartItems.push({productId: new mongodb.ObjectId(product._id), qty: newQty})
//         }

//         const updatedCart = {items: updatedCartItems};

//         const db = getDb();

//         return db
//             .collection('users')
//             .updateOne(
//             {_id: new mongodb.ObjectId(this._id)},
//             {$set: {cart: updatedCart}}
//         );
//     }

//     getCart(){
//         const db = getDb();

//         const productIds = this.cart.items.map(i => {
//             return i.productId;
//         })

//         return db.collection('products')
//             .find({_id: { $in: productIds}})
//             .toArray()
//             .then(products => {
//                 return products.map(p => {
//                     return {
//                         ...p, 
//                         qty: this.cart.find(i => {
//                             return i.productId.toString() === p._id.toString();
//                         }).qty 
//                     };
//                 });
//             });
//     }

//     deleteItemFromCart(prodId){
//         const updatedCartItems = this.cart.items.filter( item => {
//             return item.productId !== prodId
//         });

//         const db = getDb();

//         return db
//             .collection('users')
//             .updateOne(
//             {_id: new mongodb.ObjectId(this._id)},
//             {$set: {cart: {items: updatedCartItems}}}
//         );
//     }

//     addOrder(){
//         const db = getDb();

//         return this.getCart()
//             .then(products => {
//                 const order = {
//                     items: products,
//                     user: {
//                         _id: new mongodb.ObjectId(this._id),
//                         name: this.name,
//                     }
//                 };
//                 return db.collection('orders').insertOne(this.cart)
//             })
//             .then( res => {
//                 this.cart = {items: []};
//                 return db
//                     .collection('users')
//                     .updateOne(
//                         {_id: new mongodb.ObjectId(this._id)},
//                         {$set: {cart: {items: []}}}
//                 );
//             });
//     }

//     getOrder(){
//         const db = getDb();
//         return db.collection('orders')
//             .find({'user._id' : new mongodb.ObjectId(this._id)})
//             .toArray();
//     }

//     static findById(userId){
//         const db = getDb();

//         return db.collection('users')
//             .find(({_id: new mongodb.ObjectId(prodId)}))
//             .then(user => user)
//             .catch(e => {
//                 console.log(e)
//             });
//     }
// }

// module.exports = User