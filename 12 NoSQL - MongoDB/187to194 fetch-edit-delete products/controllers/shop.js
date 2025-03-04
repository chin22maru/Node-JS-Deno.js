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
    .then( cart => {
      return cart
        .getProducts()
        .then( cartProducts => {
            res.render('shop/cart',{
              Path: '/cart',
              pageTitle: 'Your Cart',
              cartProducts,
              cartCSS: true,
            });
        })
        .catch( e => console.log(e));
    })
    .catch( e => console.log(e));
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart, newQty = 1;
  req.user
    .getCart()
    .then( cart => {
      fetchedCart = cart;
      return cart.getProducts({where: {id: prodId}});
    })
    .then( cartProducts => {
      let cartProduct;
      if(cartProducts.length > 0) cartProduct = cartProducts[0];

      if(cartProduct){
          const oldQty = cartProduct.cartItem.qty;
          newQty = oldQty + 1;
          return cartProduct;
      }
      return Product.findByPk(prodId);        
    })
    .then( prod => {
      return fetchedCart.addProduct(prod, {
        through: { qty: newQty}
      });
    })
    .then( () => {
      res.redirect('/cart');
    })
    .catch( e => console.log(e));
};

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then( cart => {
      return cart.getProducts({where: {id: prodId} });
    })
    .then( cartProducts => {
      const cartProduct = cartProducts[0];
      return cartProduct.cartItem.destroy();
    })
    .then( (result) => {
      res.redirect('/cart');
    })
    .catch( e => console.log(e));
};

exports.postOrder = (req,res,next) => {
  let fetchedCart;
  req.user 
    .getCart()
    .then( cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then( cartProducts => {
      return req.user
        .createOrder()
        .then( order => {
          return order.addProducts(cartProducts.map( cartProduct => {
            cartProduct.orderItem = { qty : cartProduct.cartItem.qty};
            return cartProduct;
          }));
        })
        .catch( e => console.log(e));
    })
    .then( result => {
      return fetchedCart.setProducts(null);
    })
    .then( result => {
      res.redirect('/orders');
    })
    .catch( e => console.log(e));
}

exports.getOrders = (req,res,next) => {
  req.user 
    .getOrders( { include: ['products'] } ) // eager loading
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