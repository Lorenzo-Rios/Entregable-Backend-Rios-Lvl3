import { faker } from '@faker-js/faker';
import { passwordHash } from './bycrypt.js';

export const generateMockUsers = (count) => {
    const users = [];

    for (let i = 0; i < count; i++) {
        users.push({
            firs_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: passwordHash,
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: []
        });
    }
    return users;
};

export const generateMockPets = (count) => {
    const pets = [];
    for (let i = 0; i < count; i++) {
        pets.push({
            name: faker.animal.cat(),
            species: faker.animal.type(),
            date: faker.number.int({ min: 1, max: 15 }),
            owner: faker.database.mongodbObjectId()
        });
    }
    return pets;
};
