const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
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
  Product.findById()
    .then( product => {
        res.render('shop/product-detail', {
          product: product, 
          pageTitle: product.title,
          Path: '/products',
        });
    })
    .catch( err => console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
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

exports.getCart = (req,res,next) => {
  req.user
    .getCart()
        .then( cartProducts => {
            res.render('shop/cart',{
              Path: '/cart',
              pageTitle: 'Your Cart',
              cartProducts,
              cartCSS: true,
            });
        })
        .catch( e => console.log(e));
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then(product =>{
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    })
};

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then( (result) => {
      res.redirect('/cart');
    })
    .catch( e => console.log(e));
};

exports.postOrder = (req,res,next) => {
  let fetchedCart;
  req.user 
    .addOrder()
    .then( result => {
      res.redirect('/orders');
    })
    .catch( e => console.log(e));
}

exports.getOrders = (req,res,next) => {
  req.user 
    .getOrders() // eager loading
    .then( orders => {
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