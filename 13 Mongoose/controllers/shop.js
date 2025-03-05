const { SchemaTypeOptions } = require('mongoose');
const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.find()
    .then( products => {
        res.render('shop/product-list', {
          prods: products, 
          pageTitle: 'All Products', 
          Path: '/products', 
          formsCSS: false,
          productCSS: true
        }); // use default templating engine(pug) provided by app.set and return the template from path provided in app.set's views(/views) property : here in views folder shop.pug
    })
    .catch( err => {
      console.log(err);
    });
}

exports.getProduct = (req,res,next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then( product => {
      // console.log(product)
        res.render('shop/product-detail', {
          product: product, 
          pageTitle: product.title,
          Path: '/products',
        });
    })
    .catch( err => console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.find()
    .then( products => {
      res.render('shop/index', {
        prods: products, 
        pageTitle: 'Shop', 
        Path: '/', 
        formsCSS: false,
        productCSS: true
      }); 
    })
    .catch( err => console.log(err));
}

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId') 
    .then(user => {
      // console.log(user.cart.items);
      const cartProducts= user.cart.items;
      res.render('shop/cart', {
        Path: '/cart',
        pageTitle: 'Your Cart',
        cartProducts,
        cartCSS: true,
      });
    })
    .catch(e => console.log(e));
};


exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then(product =>{
      return req.user.addToCart(product);
    })
    .then(result => {
      // console.log(result);
      res.redirect('/cart');
    })
};

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then( () => {
      res.redirect('/cart');
    })
    .catch( e => console.log(e));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId') // Populate productId within cart.items
    .then(user => {
      const products = user.cart.items.map(i => {
        return { qty: i.qty, product: { ...i.productId._doc } }; // Spread product document to include all subfields
      });

      const order = new Order({
        user: {
          name: req.user.name, // Assuming 'name' is a field in your user schema
          userId: req.user._id
        },
        products: products
      });

      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(e => console.log(e));
};



exports.getOrders = (req,res,next) => {
  Order.find({'user.userId': req.user._id})
    .then(orders => {
      res.render('shop/orders',{
        Path: '/orders',
        pageTitle: 'Your Orders',
        orders,
        orderCSS: true,
      });
    })
    .catch( e => console.log(e));
}

exports.getCheckout = (req,res,next) => {
  res.render('shop/checkout',{
    Path: '/checkout',
    pageTitle: 'Checkout',
  });
}