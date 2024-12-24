import { bcrypt } from 'bcrypt'

const passwordHash = bcrypt.hashSync('coder123', 10);

export const hashPassword = (password) => {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
};

export {
    passwordHash
}