const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('shop/product-list', {
          prods: products, 
          pageTitle: 'All Products', 
          Path: '/products', 
          formsCSS: false,
          productCSS: true
        }); // use default templating engine(pug) provided by app.set and return the template from path provided in app.set's views(/views) property : here in views folder shop.pug
    }); 
}

exports.getIndex = (req, res, next) => {
  const products = Product.fetchAll((products) => {
      res.render('shop/index', {
        prods: products, 
        pageTitle: 'Shop', 
        Path: '/', 
        formsCSS: false,
        productCSS: true
      }); 
  }); 
}

exports.getCart = (req,res,next) => {
  res.render('shop/cart',{
    Path: '/cart',
    pageTitle: 'Your Cart',
  });
}

exports.getOrders = (req,res,next) => {
  res.render('shop/orders',{
    Path: '/orders',
    pageTitle: 'Your Orders',
  });
}

exports.getCheckout = (req,res,next) => {
  res.render('shop/checkout',{
    Path: '/checkout',
    pageTitle: 'Checkout',
  });
}