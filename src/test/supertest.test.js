/* import chai from "chai"; */
import * as chai from 'chai';
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing ecommerce', () => {
    describe('Test de endponit de prodcuts', () => {
        it('El endpoint POST  /api/products debe crear un producto correctamente', async () => {

            const productTest = {
                title: 'Producto test',
                description: 'Producto utilizado para test',
                price: 99,
                code: 99999,
                stock: 99,
            }

            const { statusCode, _body } = await requester.post('/api/products').send(productTest);
            expect(statusCode).to.be.equal(201);
            expect(_body.product).to.have.property('_id');
            expect(_body.product.satatus).to.be.true;
        });

        it('El endpoint GET /api/poducts/:pid debe traer a tarves de su id un producto en formato objeto', async () => {

            const response = await requester.get('/api/products/65a867b5ee942fac79980980');
            expect(response.statusCode).to.be.equal(200);
            expect(response._body.productId).to.be.an('object');
            expect(response._body.productId).to.have.property('_id');
        });

        it('El endpoint DELETE /api/poducts/:pid debe eliminar corretamente un producto de la Bd a traves de su Id y resivir un mensaje avisando que se elimino un producto', async () => {
            const productTestDeleted = {
                title: 'Producto test',
                description: 'Producto utilizado para test',
                price: 99,
                code: 1000011111,
                stock: 99,
            }

            const { _body } = await requester.post('/api/products').send(productTestDeleted);
            const id = _body.product._id;

            const response = await requester.delete(`/api/products/${id}`);
            const getProduct = await requester.get(`/api/products/${id}`)

            expect(response.statusCode).to.be.equal(200);
            expect(response.text).to.be.ok;
            expect(getProduct.statusCode).to.not.equal(200);
        });
    });

    describe('Test de endponit de carts', () => {

        it('El endoint POST /api/carts debe crear un cart con una campo de product de tipo array vacio y guardarlo en Bd', async () => {

            const response = await requester.post('/api/carts');
            const id = response._body._id;

            const getCartId = await requester.get(`/api/carts/${id}`);

            expect(response.statusCode).to.be.equal(201);
            expect(response._body.products).to.be.an('array');
            expect(response._body.products).to.be.an('array').that.is.empty;
            expect(getCartId.statusCode).to.be.equal(200);
            expect(getCartId._body.products).to.be.an('array');
            expect(getCartId._body.products).to.be.an('array').that.is.empty;
        });

        it('En en endpoint Post /api/carts/:cId/product/:pId se agrega un producto a un carrito', async () => {

            const newCart = await requester.post('/api/carts');
            const idCart = newCart._body._id;

            const response = await requester.post(`/api/carts/${idCart}/product/65a8572b02691e8b43ea2143`);
            const getCartId = await requester.get(`/api/carts/${idCart}`);

            expect(response.statusCode).to.be.equal(200);
            expect(getCartId._body.products).to.be.an('array').that.is.not.empty;
            expect(getCartId._body.products.some(product => product.idProduct === '65a8572b02691e8b43ea2143')).to.be.true;
        });

        it('En en endpoint DELETE /api/carts/:cId se borra todo lo que tenga en el campo products dejandolo como un arry vacio', async () => {

            const newCart = await requester.post('/api/carts');
            const idCart = newCart._body._id;

            const cart = await requester.post(`/api/carts/${idCart}/product/65a8572b02691e8b43ea2143`);
            const getCartIdPush = await requester.get(`/api/carts/${idCart}`);
            const response = await requester.delete(`/api/carts/${idCart}`);
            const getCartIdDelete = await requester.get(`/api/carts/${idCart}`);

            expect(response.statusCode).to.be.equal(200);
            expect(getCartIdPush._body.products).to.be.an('array').that.is.not.empty;
            expect(getCartIdDelete._body.products).to.be.an('array');
            expect(getCartIdDelete._body.products).to.be.an('array').that.is.empty;

        });
    });

    describe('Test de endponit de sessions', () => {

        it('En este endpoint POST /api/session/register crea un nuvo usuario, inicia session y te redirecciona a la vista de products', async () => {

            const newUser = {
                first_name: 'userPrueba',
                last_name: 'userPrueba',
                email: 'prueba@userprueba',
                age: 99,
                password: '1234'
            };
            const response = await requester.post('/api/session/register').send(newUser);

            expect(response.statusCode).to.be.equal(302);
            expect(response.header.location).to.be.equal('/products');
        });

        it('En este endpoint POST /api/session/login se recibe un mail y una contraseña, se comapra en la Bd y si es correcta inicia sesion  y redirecciona a /products', async () => {

            const userPrueba = {
                email: 'brian@gmail.com',
                password: '1234'
            }

            const response = await requester.post('/api/session/login').send(userPrueba)
            expect(response.statusCode).to.be.equal(302);
            expect(response.header.location).to.be.equal('/products');
        });

        it('En este endpoint POST /api/session/logout cierra la sesion que este abierta y te redirecciona a /login', async () => {


            const userPrueba = {
                email: 'brian@gmail.com',
                password: '1234'
            }

            const session = await requester.post('/api/session/login').send(userPrueba);
            const response = await requester.post('/api/session/logout');

            expect(response.statusCode).to.be.equal(200);
            expect(response._body.redirect).to.be.equal('http://localhost:8080/login');
        });
    });

});