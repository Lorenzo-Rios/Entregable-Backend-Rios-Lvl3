import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export const generateMockUsers = (count) => {
    const users = [];
    const passwordHash = bcrypt.hashSync('coder123', 10);

    for (let i = 0; i < count; i++) {
        users.push({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
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
            age: faker.number.int({ min: 1, max: 15 }),
            owner: faker.database.mongodbObjectId()
        });
    }
    return pets;
};