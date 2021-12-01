let express = require('express');
let app = express();
let path = require('path');
const PORT = 8080;
let Contenedor = require('./contenedor')
let contenedor = new Contenedor('./api/productos.txt');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('views', path.join(__dirname, './views', 'pug'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    console.log(req.query);
    res.render('formularioPug.pug', req.query);
})
app.get('/productos', (req, res) => {
    console.log(req.query);
    contenedor.getProductos()
    res.render('formularioPug.pug', req.query);
})




app.listen(PORT, ()=>{
    console.log(`Server escuchando desde http://localhost:${PORT}`)
})

module.exports = app;