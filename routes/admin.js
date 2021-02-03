const path = require('path');

const express = require('express');

const rootDir = require('../utils/path.js')

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    //si je passe ici, je ne passe pas dans le suivant parce que pas de next
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    
    // pug
    res.render('add-product', {
        pageTitle: "Add product 0000", 
        path: '/admin/add-product',
        activeProducts: true
    });
});

router.post('/add-product', (req,res, next) => {
    console.log("product added", req.body);
    products.push({title: req.body.title})
    res.redirect('/shop');
});

exports.routes = router;
exports.products = products;