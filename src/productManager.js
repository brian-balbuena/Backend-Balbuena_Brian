import fs from 'fs';

 class ProductManager {
    constructor(path) {
        this.path = path;
    };

    async addProduct(infoProduct) {

        const resultGetCode = await this.#getCodeProduts(infoProduct.code);
        if (resultGetCode !== undefined) {
            console.error("Codigo incorrecto");
            return false;
        };

        console.log(infoProduct);
        const validation = this.#validationData(infoProduct);
        if (!validation) {
            console.error("Todos los campos son obligatorios");
            return false;
        };

        try {
            const dbProducts = await this.getProducts();
            const productAdd = await this.#mappingProduct(infoProduct);

            dbProducts.push(productAdd);

            const products = JSON.stringify(dbProducts);
            await fs.promises.writeFile(this.path, products, "utf-8");

            console.log("Producto cargado con exito!!!");
            return true;
        } catch (error) {
            console.error("Error al cargar el producto");
            return false;
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

    async getProductById(id) {

        const data = await this.getProducts();
        const getProductId = data.find(product => product.id === +id);

        return getProductId;
    }


    async updateProduct(id, infoNew){

        const getIndex = await this.#getIndexProduct(+id);
        if(getIndex !== -1){
            
            const validationKey = await this.#validationKey(infoNew);
            if(validationKey){
                try {
                    const productsUpdate = await this.#mappingProductUpdate(getIndex, infoNew);
                    const productsCarga = JSON.stringify(productsUpdate);
    
                    await fs.promises.writeFile(this.path, productsCarga, "utf-8");
    
                    console.log("Producto editado con exito!!!");
                    return true;
    
                } catch (error) {
                    console.error("Error al editar el producto");
                    return false;
                }
            }else{
                console.error('El objeto no coincide');
                return false;
            }
       
        }else{
            console.error(`EL ${id} no existe`);
            return false;
        }

    };

    async deleteProduct(id){

        const getIndex = await this.#getIndexProduct(+id);
        if(getIndex !== -1){

            try {
                let data = await this.getProducts();
                data.splice(getIndex, 1);

                const productsCarga = JSON.stringify(data);
                await fs.promises.writeFile(this.path, productsCarga, "utf-8");

                console.log("Producto borrado con exito!!!");
                return true;

            } catch (error) {
                console.error("Error al borrar el producto");
                return false;
            }
        }else{
            console.error(`EL ${+id} no existe`);
            return false;
        }
    };



    async #getCodeProduts(code) {

        const data = await this.getProducts();

        const validationcode = data.find(product => product.code == code);

        return validationcode;
    };

    async #getIndexProduct(id){
        const data = await this.getProducts();

        const index = data.findIndex( (obj) => obj.id === id);

        return index;
    };

    #validationData(info) {
        let validation = true;

        if (!info.title || !info.description || !info.price || !info.code || !info.stock) {
            validation = false;
        };

        return validation
    };

    #validationKey(info){

        const keys = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
        const infoKeys = Object.keys(info);

        let validation = true;
        infoKeys.forEach((infoKey) => {
        let compare = keys.includes(infoKey);

        if(!compare){
            validation = false;
            return validation;
        };
           
        });

        return validation;
    };

    async #mappingProduct(infoProduct) {

        const idNew = await this.#assignId();
        const newProduct = {
            id: idNew,
            title: infoProduct.title,
            description: infoProduct.description,
            price: infoProduct.price,
            thumbnail: infoProduct.thumbnail,
            code: infoProduct.code,
            stock: infoProduct.stock,
            category: 'generico',
            status: true
        };

        return newProduct;
    };

    async #mappingProductUpdate(index, infoNew){
        const products = await this.getProducts();

        products[index].id = products[index].id;
        products[index].title = infoNew.title == null ? products[index].title : infoNew.title;
        products[index].description = infoNew.description == null ? products[index].description : infoNew.description;
        products[index].price = infoNew.price == null ? products[index].price : +infoNew.price;
        products[index].thumbnail = infoNew.thumbnail == null ? products[index].thumbnail : infoNew.thumbnail;
        products[index].code = infoNew.code == null ? products[index].code : infoNew.code;
        products[index].stock = infoNew.stock == null ? products[index].stock : +infoNew.stock;
  
        return products;
    };

    async #assignId(){
        const data = await this.getProducts();

        if(data.length === 0){
            return 1;
        };
        const ultimoObj = data[data.length -1];
        const idUltimoObj = ultimoObj.id;

        const id = idUltimoObj + 1;
       
        return id;
    };

};
  
export default ProductManager;

const test = async () => {

    const productManager = new ProductManager('./db_Productos.json');

    //TEST ARRAY PRODUCTOS
    /* let productos = await productManager.getProducts();
    console.log(productos); */

    //TEST CARGA DE PRODUCTOS
 /*    const infoProducto = {
        title: "remera",
        description: "remera lisa",
        price: 2500,
        thumbnail: "././lalalla",
        code: "00121",
        stock: 500,
    }

    const infoProducto1 = {
        title: "pantalon",
        description: "pantalon largo",
        price: 1700,
        thumbnail: "././lalalla",
        code: "00044",
        stock: 200,
    }

    await productManager.addProduct(infoProducto);
    await productManager.addProduct(infoProducto1); */


    //TEST BUSQUEDA DE PRODUCTO POR ID
   /* const productId = await productManager.getProductById(2);
   console.log(productId); */


   //TEST EDIT DE PRODUCTO
 /*   const productEdit = {
    title: "remera",
   }; 
   await productManager.updateProduct(1, productEdit); */


   //TEST LISTA DE PRODUCTOS
    /* productos = await productManager.getProducts(); */


    //TEST DELET PRODUCTO
   /*  await productManager.deleteProduct(2); */

};

test();
