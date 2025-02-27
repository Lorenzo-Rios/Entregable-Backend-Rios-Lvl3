import bcrypt from 'bcrypt'

const passwordHash = bcrypt.hashSync('coder123', 10);

const createHash = password => bcrypt.hashSync (password, bcrypt.genSaltSync(10))

const isValidPassword = (passwordBody, userPassword) => bcrypt.compareSync(passwordBody, userPassword)

export const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

export {
    passwordHash,
    createHash,
    isValidPassword
}