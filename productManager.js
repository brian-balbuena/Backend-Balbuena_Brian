
const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    };

    static id = 0;

    async addProduct(infoProduct) {

        let resultGetCode = this.#getCodeProduts(infoProduct.code);
        if (resultGetCode !== undefined) {
            return console.error("Codigo incorrecto");
        };

        let validation = this.#validationData(infoProduct);
        if (!validation) {
            return console.error("Todos los campos son obligatorios");
        };

        try {
            const dbProducts = await this.getProducts();
            const productAdd = this.#mappingProduct(infoProduct);

            dbProducts.push(productAdd);

            const products = JSON.stringify(dbProducts);
            await fs.promises.writeFile(this.path, products, "utf-8");

            return console.log("Producto cargado con exito!!!");
        } catch (error) {
            return console.error("Error al cargar rl producto");
        }

    };

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const dataArray = JSON.parse(data);

            return dataArray;
        } catch (error) {
            console.error("No hay datos");
            return [];
        }

    };

    getProductById(id) {
        let getProductId = this.products.find(product => product.id === id);

        if (getProductId == undefined) {
            return "Not found";
        }

        return getProductId;
    }


    #getCodeProduts(code) {
        /*let validationcode = this.products.find(product => product.code == code);

        return validationcode;*/

        // FALTA CORREGIR ESTA VERIFICAION QUE HACE QUE NO SE PUEDAN CARGAR PRODUCTOS YA CARGADOS POR CODIGO
        return undefined;
    };

    #validationData(info) {
        let validation = true;

        if (!info.title || !info.description || !info.price || !info.thumbnail || !info.code || !info.stock) {
            validation = false;
        };

        return validation
    };

    #mappingProduct(infoProduct) {

        ProductManager.id++;
        const newProduct = {
            id: ProductManager.id,
            title: infoProduct.title,
            description: infoProduct.description,
            price: infoProduct.price,
            thumbnail: infoProduct.thumbnail,
            code: infoProduct.code,
            stock: infoProduct.stock
        };

        return newProduct;
    };
};


const test = async () => {

    const productManager = new ProductManager('./bd_Productos.json');

    let productos = await productManager.getProducts();
    console.log(productos);

  /*  const infoProducto = {
        title: "remera",
        description: "remera lisa",
        price: 2500,
        thumbnail: "././lalalla",
        code: "00121",
        stock: 500,
    }

    const infoProducto1 = {
        title: "medias",
        description: "medias lisas",
        price: 500,
        thumbnail: "././lalalla",
        code: "00002",
        stock: 400,
    }

    await productManager.addProduct(infoProducto);
    await productManager.addProduct(infoProducto1);*/


    //productos = await productManager.getProducts();
};

test();










//console.log("empieza")

//const productManager = new ProductManager();

//let infoProducto = {
// title: "remera",
// description: "remera lisa",
// price: 2500,
// thumbnail: "././lalalla",
// code: "00121",
// stock: 500,
//}
//productManager.addProduct(infoProducto);

//let infoProducto2 = {
//  title: "pantalon",
//description: "pantalon liso",
//price: 5200,
//thumbnail: "././lalalla",
//code: "00445",
//stock: 20,
//}
//productManager.addProduct(infoProducto2);

//let infoProducto3 = {
//  title: "medias",
//  description: "medias lisas",
//  price: 500,
//  thumbnail: "././lalalla",
//  code: "00002",
//  stock: 400,
//}
//productManager.addProduct(infoProducto3);

//console.log("*************************")
//console.log("Lista de productos")
//const productos = productManager.getProducts();
//console.log(productos);

/*const buscar = productManager.getProductById(2);
console.log("*************************")
console.log("Producto buscado", buscar);*/