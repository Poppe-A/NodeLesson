const path = require('path')
const express = require('express');
const bodyparser = require('body-parser');
const rootDir = require('./utils/path.js');
// const handlebars = require('express-handlebars');

const errorController = require ('./controllers/error')

const app = express();

//pug est importé par defaut, pas hbs
// sans option pour layout app.engine('hbs', handlebars());
// app.engine('hbs', handlebars({layoutsDir: 'views/', defaultLayout: 'main-layout.hbs'}))


//choix du template engine
//app.set("view engine", 'pug');
app.set("view engine", 'ejs');

app.set('views', 'views');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
// app.use('/', (req, res, next) =product> {
//     console.log('Always run');
//     next();
// });

app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);


//avant maj mvc
// app.use('/', (req, res, next) => {
//     // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))

//     //pug
//     res.status(404).render('404', {pageTitle: '404 ooo'});
// });

//après maj mvc

app.use(errorController.get404);

app.listen(3000);
