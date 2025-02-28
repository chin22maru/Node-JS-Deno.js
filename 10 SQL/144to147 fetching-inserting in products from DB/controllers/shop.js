const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll()
      .then( (rows, fieldData) => {
          res.render('shop/product-list', {
            prods: rows[0], 
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
    .then( ([rows]) => {
        res.render('shop/product-detail', {
          product: rows[0], 
          pageTitle: rows[0].title,
          Path: '/products',
        });
    })
    .catch( err => console.log(err));
}

exports.getIndex = (req, res, next) => {
  const products = Product.fetchAll()
    .then( (rows, firldData) => {
      // console.log(rows);
        res.render('shop/index', {
          prods: rows[0], 
          pageTitle: 'Shop', 
          Path: '/', 
          formsCSS: false,
          productCSS: true
        }); 
    })
    .catch( err => {
        console.log(err);
    }); 
}

exports.getCart = (req,res,next) => {
  Cart.getCart( cart => {
    Product.fetchAll( products => {
      const cartProducts = [];
      for(let product of products){
        const cartProduct = cart.products.find(prod => prod.id===product.id);
        if(cartProduct) cartProducts.push({product, qty: cartProduct.qty});
      }

      res.render('shop/cart',{
        Path: '/cart',
        pageTitle: 'Your Cart',
        cartProducts,
      });
    });
  });
}

// exports.postCart = (req,res,next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, (product) => {
//     Cart.addProduct(prodId, product.price);
    
//   })
//   res.redirect('/cart');
// }

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then( ([rows]) => {
      Cart.addProduct(prodId, rows[0].price, () => {
        res.redirect('/cart');
      });
    })
    .catch( err => console.log(err));
};

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then( ([rows]) => {
      Cart.deleteProduct(prodId, rows[0].price);
      res.redirect('/cart');
    })
    .catch( err => console.log(err));
};


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