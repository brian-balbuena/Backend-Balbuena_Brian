import { Faker, en } from "@faker-js/faker";

const faker = new Faker({
    locale: en
});

export const generateProductMocking = () => {

    return {

        title: faker.commerce.productName(),
        description: faker.lorem.text(),
        price: faker.commerce.price(),
        thumbnail: faker.image.url(),
        code: faker.number.int({min: 1000}),
        stock: faker.number.int({max: 500}),
        category : "generico", 
        satus: true
    };
};

export const generateUserMocking = () => {

    return {
        firstName: faker.person.firstName,
        lastName: faker.person.lastName,
        role: "usuario"
    }
};