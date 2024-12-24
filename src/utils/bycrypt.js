import bcrypt from 'bcrypt'

const passwordHash = bcrypt.hashSync('coder123', 10);

export const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

export {
    passwordHash
}