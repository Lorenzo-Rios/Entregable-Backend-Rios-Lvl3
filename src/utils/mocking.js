import { faker } from '@faker-js/faker';
import { passwordHash } from './bycrypt.js';
import mongoose from 'mongoose';

export const generateMockUsers = (count) => {
    const users = [];

    for (let i = 0; i < count; i++) {
        users.push({
            first_name: faker.person.firstName(), // Corrección de "firs_name"
            last_name: faker.person.lastName(),
            user_name: faker.internet.userName(),
            email: faker.internet.email(),
            password: passwordHash,
            phone: faker.phone.number(),
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: []
        });
    }
    return users;
};

export const generateMockPets = (count, userIds) => {
    const pets = [];
    for (let i = 0; i < count; i++) {
        pets.push({
            name: faker.animal.cat(),
            species: faker.animal.type(),
            date: faker.date.past().toISOString(), // Fecha válida
            owner: userIds.length > 0 ? faker.helpers.arrayElement(userIds) : new mongoose.Types.ObjectId() // Usa un usuario real si existe
        });
    }
    return pets;
};