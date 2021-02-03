const path = require('path');

const express = require('express');

const rootDir = require('../utils/path.js')
const adminData = require('./admin');
const router = express.Router();

router.use('/shop', (req, res, next) => {
    //réponse pour envoyer un fichier html
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    const products = adminData.products;

    //template
    // res.render('shop', {data: products, path: '/shop'});

    //pour handlebars qui n'accepte que du true false sur une propriété dans les statement, on doit renvoyer diretement la valeur
    res.render('shop', {
        data: products, 
        dataOk: products.length > 0, 
        path: '/shop',
        pageTitle: 'Shop',
        activeShop: true,
    });
});

module.exports = router;