let express = require('express');
let app = express();
let path = require('path');
const PORT = 8080;
let {Router} = express;
let Contenedor = require('./contenedor')
let contenedor = new Contenedor('./api/productos.txt');
let router = new Router();
//let pdr =[];

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('views', path.join(__dirname, './views', 'pug'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    console.log("get raiz",req.query);
    res.render('formularioPug');
});
router.get('/productos', (req, res) => {
    console.log(req.query);
    contenedor.getProductos()
        .then((producto)=>{
            res.render('templatePug', {producto});
            console.log("get",producto)
    })
        .catch((error)=>{
            res.send(error);
    })    
});

router.post('/productos', (req, res) => {
    contenedor.save(req.body)
    .then(producto => {
        
        console.log("producto guardado", producto);
        
        //res.render('templatePug', {producto});
        res.redirect('/');
       
    }).catch(error => {
        res.send(error);
    });
});

router.get('/productos/:id', (req, res,next) => {
    console.log('ID:', req.params.id)
        contenedor.getById(req.params.id).then(producto => {
            res.render('templatePug', {producto});
            console.log("id", producto)
        }).catch(error => {
            res.send(error);
        });
});



app.use('/api',router);
app.listen(PORT, ()=>{
    console.log(`Server escuchando desde http://localhost:${PORT}`)
})

module.exports = app;