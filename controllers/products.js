const Product = require('../models/product')


exports.getAddProduct = (req, res, next) => {
    console.log("get add prod")
    res.render('add-product', {
        pageTitle: "Add product 0000", 
        path: '/admin/add-product',
        activeProducts: true
    });
}

exports.postAddProduct = (req,res, next) => {
    console.log("product added", req.body);
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/shop');
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll();
    console.log("list", products)
    res.render('shop', {
        data: products, 
        dataOk: products.length > 0, 
        path: '/shop',
        pageTitle: 'Shop',
        activeShop: true,
    });
}