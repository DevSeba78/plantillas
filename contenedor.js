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
            let respuesta = 'El producto no existe'
            let productos = await this.getProductos();
            if(productos.length > 0){
                productos.forEach(element => {
                    element.id == id ? respuesta = element : respuesta;
                });
            }
            return respuesta;
        } catch (error) {
            throw new Error(error);
        }
    }
    async save(producto){//guardar y devolver el id del producto
        try{
            let data = await this.getProductos();
            let newId = await this.getNewId(data);
            let newProducto = {id: newId, ...producto};
            data.push(newProducto);
            let content = JSON.stringify(data, null,2);
            await fs.promises.writeFile(this.url, content);

            return newProducto;
           // await fs.writeFileSync(this.url, JSON.stringify(data));
        }catch(error){
            console.log(error);
        }
    }
    async getNewId(productos){
        try{
            let resp = productos.reduce((max, producto) => {
                return producto.id > max ? producto.id : max;
            }, 0);
            return resp + 1;
        }catch(error){
            console.log(error);
        }
    }
}
module.exports = Contenedor;