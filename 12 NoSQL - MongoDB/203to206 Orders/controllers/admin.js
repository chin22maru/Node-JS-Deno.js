
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

    const product = new Product(title, price, description, imgUrl);
    product
      .save()
      .then( result => {
        // console.log(result);
        console.log('created a product!');
        res.redirect('/admin/products');
      })
      .catch( err => {
        console.log('Error: .............');
        console.log(err);
      });
};


exports.getEditProduct = (req, res, next) => {
  const editmode = req.query.editmode;
  if(!editmode){
    return res.redirect('/');
  }

  const prodId = req.params.productId;

  // Product.findByPk(prodId)
  Product.findById(prodId)
    .then( product => {
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
    .catch( err => console.log(err) );
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;  // in body we have name-value prameters
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedimgUrl = req.body.imgUrl;

  const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedimgUrl, prodId, null, req.user._id);

  product
    .save()
    .then( result => {
      console.log("Product Updated!");
      res.redirect('/admin/products');
    })
    .catch( err => console.log(err) );

}

  exports.getProducts = (req, res, next) => {
    Product.fetchAll()
      .then( products => {
        res.render('admin/products', {
          prods: products, 
          pageTitle: 'Admin Products', 
          Path: './admin/products', 
          formsCSS: false,
          productCSS: true
        }); 
      })
      .catch( err => console.log(err));
  }


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.deleteById(prodId)
    .then( () => {
      console.log("Product Deleted!");
      res.redirect('/admin/products');
    })
    .catch( err => console.log(err) );
}
  