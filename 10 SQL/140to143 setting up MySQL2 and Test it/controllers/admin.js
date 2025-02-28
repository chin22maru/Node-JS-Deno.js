const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product', 
        Path: './admin/add-product',
        formsCSS: true,
        productCSS: true,
        editing: false
    })
}
  
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const description = req.body.description;
    const price = req.body.price;

    const product = new Product(null,title,imgUrl,description,price);
    product.save();
    res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
  const editmode = req.query.editmode;
  if(!editmode){
    return res.redirect('/');
  }

  const prodId = req.params.productId;
    Product.findById(prodId, product => {
      if(!product){
        return res.redirect('/');
      }

      res.render('admin/edit-product', {
        editing: editmode,
        product:product,
        pageTitle: 'Edit Product', 
        Path: './admin/edit-product',
        formsCSS: true,
        productCSS: true
      })
    })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;  // in body we have name-value prameters
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedimgUrl = req.body.imgUrl;

  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedimgUrl,
    updatedDescription,
    updatedPrice
  );

  updatedProduct.save();

  res.redirect('/admin/products');
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


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
}
  