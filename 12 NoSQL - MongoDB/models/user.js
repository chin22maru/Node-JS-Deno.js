const mongodb = require('mongodb')
const getDb = require('../util/database').getDb;

class User{
    constructor(username, email, cart){
        this.name= username;
        this.emial = email;
        this.cart = cart; // { items: [] }
    }

    save(){
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product){
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        })

        let newQty = 1;
        const updatedCartItems = [...this.cart.items];

        if(cartProductIndex >=0 ){
            newQty = this.cart.items[cartProductIndex].qty + 1;
            updatedCartItems[cartProductIndex].qty = newQty;
        }else{
            updatedCartItems.push({productId: new mongodb.ObjectId(product._id), qty: newQty})
        }

        const updatedCart = {items: updatedCartItems};

        const db = getDb();

        return db
            .collection('users')
            .updateOne(
            {_id: new mongodb.ObjectId(userId)},
            {$set: {cart: updatedCart}}
        );
    }

    getCart(){
        const db = getDb();

        const productIds = this.cart.items.map(i => {
            return i.productId;
        })

        return db.collection('products')
            .find({_id: { $in: productIds}})
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {...p, qty: this.cart.find(i => {
                        return i.productId.toString() === p._id.toString();
                    })}
                })
            })
    }

    static findById(userId){
        const db = getDb();

        return db.collection('users')
            .find(({_id: new mongodb.ObjectId(prodId)}))
            .then(user => user)
            .catch(e => {
                console.log(e)
            });
    }
}

module.exports = User