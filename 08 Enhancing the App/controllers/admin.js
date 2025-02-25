const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product', 
        Path: './admin/add-product',
        formsCSS: true,
        productCSS: true
      })
  }
  
  exports.postAddProduct = (req, res, next) => {
        const title = req.body.title;
        const imgUrl = req.body.imgUrl;
        const description = req.body.description;
        const price = req.body.price;

        const product = new Product(title,imgUrl,description,price);
        product.save();
        res.redirect('/');
  }

  exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('admin/products', {
          prods: products, 
          pageTitle: 'Admin Products', 
          Path: './admin/products', 
          formsCSS: false,
          productCSS: true
        }); 
    }); 
  }
  