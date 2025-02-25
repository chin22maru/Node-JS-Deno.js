const Product = require('../models/product')
exports.getAddProduct = (req, res, next) => {
  res.render(
    'add-product', {
      pageTitle: 'Add Product', 
      Path: './admin/add-product',
      formsCSS: true,
      productCSS: true
    })
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('shop', {
          prods: products, 
          pageTitle: 'Shop', 
          Path: '/', 
          formsCSS: false,
          productCSS: true
        }); // use default templating engine(pug) provided by app.set and return the template from path provided in app.set's views(/views) property : here in views folder shop.pug
    });
    
}