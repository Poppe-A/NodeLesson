/*

/////////////////////
//// BASIC SERVER
////////////////////

1 - Receiving request

    const http = require('http')

    const server = http.createServer((req, res) => {
        console.log(req.url, req.method, req.headers);

        res.setHeader('Content-type', 'text/html')
        res.write('<html>prout</html>')
        res.end();


        // process.exit(); quitte l'appli
    })

    server.listen(3000)

2 - redirecting ansd storing file

    const http = require('http')

    const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.setHeader('Content-type', 'text/html')
        res.write('<html><form action="/message" method="POST"><input type="text"><button type="submit">Send</button></html>')
        return res.end();
    } else if (url === "/message" && method === "POST") {
        fs.writeFile('message.txt, 'DUMMY');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    console.log(req.url, req.method, req.headers);

    res.setHeader('Content-type', 'text/html')
    res.write('<html>prout</html>')
    res.end();


    // process.exit(); quitte l'appli
    })

    server.listen(3000)


    ///////////////////////
    ////// PARSING REQUEST
    ///////////////////////

    const body = [];
    req.on('data', (chunk) => {
        console.log("chunk", chunk)
        body.push(chunk);
    })

    req.on('end', () => {
        console.log("body", body)
        const parsedBody = Buffer.concat(body).toString();
        console.log("parsed", parsedBody)
        const message = parsedBody.split('=')[1];
        fs.writeFileSync('message.txt', message);

    })

    /////////////////////////////
    ////// NODE MODULE SYSTEM / ROUTES
    /////////////////////////////

    voir Beginning

    on fait un fichier routes.js dans lequel on écrit une methode requestHandler qui contient les routes
    const requestHandler = (req, res) => {...}
    fin de fichier => module.exports = requestHandler;

    dans le app.js on importe routes.js

    const routes = require('./routes');
    et  const server = http.createServer(routes)

    possible de faire

    module.exports = {
        handler: requestHandler,
        text: 'zefgzef'
    }

    ou

    module.exports.handler = requestHandler;
    module.exports.text = "sgergreg"

    et dans app après l'import de routes, routes.handler
    node allow us to write exports instead of module.exports


    ///////////////////////////////////
    /////// DEV WORKFLOW AND DEBUG
    ///////////////////////////////////

    npm init pour démarrer un projet
        puis pakage.json -> script
    npm start -> node app.js
    npm xxx pour nomde script reservé
    si je veux faire un script maison, npm run xxx

    dev dependecies ^1.0.2

    watcher -> nodemon

    nodemon app.js

    -------- Penser aux points d'arret dans le ode, valable sur node aussi
    run -> start debug -> node env, puis debug console en bas
    on peut utiliser les variables de l'appli dans le debugger si point d'arret

    possible de restart automatiquement le debug.
    run -> add configuration -> node
    ajout dossier .vscode -> launh.json -> configuration 
    "restart": true,
    "runtimeExecutable": "nodemon"

    possible de changer le terminal de debug
    "console: "integratedTerminal"

    View -> problem pour afficher les variables

    /////////////////////
    ///// EXPRESS 
    /////////////////////

    Express est une infrastructure web middleware et de routage, 
    qui a des fonctions propres minimes : une application Express n’est 
    ni plus ni moins qu’une succession d’appels de fonctions middleware.

Les fonctions de middleware sont des fonctions qui peuvent accéder à 
l’objet Request (req), l’objet response (res) et à la fonction middleware 
suivant dans le cycle demande-réponse de l’application. 

const express = require('express');

const app = express();
const server = http.createServer(app);


1 --- basic middleware

app.use((req, res, next) => {
    console.log('In the middleware')
    next(); //necessaire pour avoir le prochain MW
});

on définit les middleware, puis on créé le server

!!! Les MW ne renvoient pas une réponse par defaut, il faut faire next, ou envoyer une reponse

on peut toujours res.write ou res.setHeader, mais maintenant res.send()
send set un content type text par defaut

!!! on peut constater deux appels au middleware, url + favicon

app.use('/addProduct', (req, res, next) => {
    console.log('Products')
    res.send('<h1>Prout</h1>')
});

app.use('/', (req, res, next) => {
    res.send('<h1>base</h1>')
});

2 --- Routes file

Dossier routes 
On créé un ficher routes qui correspond à une partie de l'appli, un scénario ...
admin.js
on importe express, express.Router()
et on associe des middleware au router
router.use('/add-product', ...)
Puis on export le router 
module.exports == router;

En gros on déclare les routes au routeur

Si nom de route communs : /admin/...
on peu le virer des middleware dans les fichiers routes, 
et dans app on ajoute
app.use('/admin', adminRoutes);
ne pas oublier admin dans le form

3 --- Filtering
Donc on peut filtrer par middleware app.use('/ergetg),
par router routeur.use('/regreg)
app.use('/truc', nomDeFichierRoutes)
ou par method
app ou router.get('/ergerg'), .post, ...


//////////////
////// PATH
//////////////

quand on fait un res.sendFile, le chemin a indiquer est absolu
Or cet absolu se refère à l'os et pas au projet.
Donc on importe path pour récupérer le chemin du projet (j'imagine) et on fait
path.join(__dirname, 'views ou dossier', 'shop ou fichier')
__dirname est une variable globale qui contient le chemin de l'os vers le projet, dans le dossier dans lequel se trouve le fichoer qui contient __dirname
dans le join(__dirname, '..', 'folder')
on met .. pas ../ comme ça pas de doutes, si on est sur mac ou windows ça fonctionne

On peut aussi faire un petit util path.js
qui fait module.exports = path.dirname(process.mainModule.filename)
qui renvoit le chemin du fichier  de démarrage de l'appli, donc probablement à la racine du projet
puis dans le fichier
const rootDir = require('utils/path.js')

path.join(rootDir, 'views', ...)

///////////////////////////////
/// SERVING FILES STATICLY
///////////////////////////////

exemple pour servir un fihier css

middleware pour servir un dossier static
app.use(express.static(path.join(__dirname, 'public')));

puis dans le fichier html, 
    <link rel='stylesheet' type='text/css' href='/main.css'>
parce que on onsidère qu'on est déjà dans le dossier public
Express va prendre toutes les requetes qui cherchent un fichier et va les diriger vers public

////////////////////////////////////
///// DYNAMIC CONTENT AND TEMPLATE
////////////////////////////////////

    app.set('name', 'value')
    Genre de variable globale à l'appli
    Certains noms reservés (views, view engine, ...)

    app.set("view engine", 'pug');
    app.set('views', 'views')

    permet de définir pug comme template
    et le dossier view comme dossier views

------------- PUG

voir fichier pug
        header.main-header créé un header avec class

ensuite dans shop.js, res.render('shop') (pas besoin de path, vu qu'on a défini views)

!!!! Dans admin, on export la list de produits, qu'on importe dans shop.
On la passe en paramètre au render pug 
res.render('shop', {data: products})
et dans pug, on appelle #{data}

dans pug, si on ne met rien (juste une classe), c'est automatiquement une div

!!!! fonction basic, dans le main : (conditional rendering)
each product in data
    h1 data.title, ...


---------------- LAYOUT

On a un header qui est toujorus le meme, don on fait un main-layout.pug qui le contient.
et pour ce qui doit changer (le contenu, les imports de styles, ...) on écrit block styles, block content

donc dans main-layout

  header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a(href="/shop") Shop
                    li.main-header__item
                        a(href="/admin/add-product") Add Products
        block content


et dans les fichiers : 

extends main-layout.pug 

block content 
    h1 Page not found ! 404

pour érire du js, on met entre paranthèses : a(href="/shop", class=(path==='/shop' ? "active" : '')) Shop

!!!visiblement si on est dans les paranthèses on peut écrire directement la prop, sinon#{prop}

PUG est inclu de base avec express. Il faut l'installer mais pas besoin de l'importer (on le déclare dans app.set('view-engine'))

//////////////////////////
///// HANDLEBARS
//////////////////////////

RELOU

Il faut importer handlebars
Un peu relou, mais dans app.engine, le nom qu'on met devient l'extension du fichier. 
app.engine('hbs', handlebars());
404.hbs

La manière dont on passe la data aux templates ne change pas selon l'engine {data: data}

pour récuperer la data {{ pageTitle }}

!!! attention :
Avec handlebars, on met la logique côté js, avant le template.
hbs n'est pas capable de faire {{#if machin.length > 0}}
il faut côté js : {machinOk: machin.length > 0}
et hbs : {{#if machin}}

hbs ne test que sur du true false

dans un each sur hbs, on se réfère à l'élément courant avec this


HANDLEBARS LAYOUT

conf : app.engine('hbs', handlebars({layoutsDir: '/views/', defaultLayout: 'main-layout'}))
apparament express cherche un main-layout.handlebars
donc il faut préciser

conf : app.engine('hbs', handlebars({layoutsDir: '/views/',
 defaultLayout 'main-layout',
 extname: 'hbs'
}))

moi j'ai fait defaultLayout: 'main-layout.hbs'
et ça fonctionne

on fait le main-layout, avec header et tout
en fin de layout on fait {{{ body }}}
c'est là que seront importés les fichiers

pas de block comme dans pug.
Donc on fait le css :
 {{#if activeShop}}
        <link rel='stylesheet' type='text/css' href='/product.css'>
    {{/if}}
Pour les classes :
    <li class="main-header__item"><a class="{{#if activeShop}}active{{/if}}" href="/shop">Shop</a></li>
 
dans le render côté js, on peut passer la prop layout: false, ça évite d'utiliser le layout par defaut

///////////////
//// EJS 
///////////////

comme pug, supporté de base

pour acceder aux props <%= prop %>

on met le code js entre <% %> un peu comme php
                    <% data.forEach(elm => { %>


Pas de layout -> partials
dossier includes dans les views

puis <%- include('./includes/leTrucAInclure.ejs') %>


///////////////
//////// MVC 
///////////////

L'idée est de séparer model vue et controlleur
Controlleur sur node, ce qui gère l'action correspondant à une route
Views, ce qui va etre affiché
et model, ce qui gère la data, la met en forme. Dans notre cas, c'est une classe product, qui permet de créer un produit avec un titre,
de stocket ce produit, et de retourner tout les produits