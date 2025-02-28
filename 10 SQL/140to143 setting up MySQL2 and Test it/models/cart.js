const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
);

module.exports = class Cart{

    static addProduct(id, productPrice, callback) {
        // fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            
            // analyze the cart and find exiting product
            // add new product / increase quantity
            // update the cart
            const existingProductIndex = cart.products.findIndex(prod => prod.id == id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
    
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty += 1;
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products.push(updatedProduct);
            }
    
            cart.totalPrice += +productPrice;
    
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (!err && callback) callback();
            });
        });
    }
    


    static deleteProduct(id,price){
        fs.readFile(p, (err, fileContent) => {
            if(err) return;

            const updatedCart = {... JSON.parse(fileContent)};
            const product = updatedCart.products.find( p => p.id === id);

            if(!product) return;

            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(p => p.id !== id);
            updatedCart.totalPrice = Math.max(0, updatedCart.totalPrice - productQty * price);
 
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        })
    }

    static getCart(callBack){
        fs.readFile(p, (err, fileContent) => {
            if(err) callBack(null);
            else{
                const cart = JSON.parse(fileContent);
                callBack(cart)
            }
        });
    }
}