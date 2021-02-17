const path = require('path');

const express = require('express');

const rootDir = require('../utils/path.js')

const productsController = require('../controllers/products');

const router = express.Router();


// avant optimisation mvc
/*
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
*/
//apres opti mvc
router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

module.exports = router;

// c'est géré dans products.js (mvc update)
// exports.products = products;