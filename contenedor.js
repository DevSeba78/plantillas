let fs = require('fs');
let path = require('path');

class Contenedor {
    constructor(url) {
        this.url = url;
    }
    async getProductos(){  
        try{
            let data = await fs.promises.readFile(this.url,'utf-8');
            return JSON.parse(data);
        }catch(error){
            return [];
        }
    }
    async getById(id){
        try {
            let respuesta = "producto inexistente"
            let contenido = await this.getProductos();
            if(contenido.length > 0){
                contenido.forEach(producto => {
                    if(producto.id == id){
                        respuesta = producto;
                    }
                });
                return respuesta;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = Contenedor;