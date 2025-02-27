import { userRepository } from '../../repository/User.repository.js';
import { createHash, isValidPassword } from '../../utils/bcrypt.js';
import { generateToken } from '../../utils/jsonwebtoken.js';

class SessionController {
    async getData(req, res) {
        res.status(200).send({
            status: 'success',
            dataUser: req.user,
            message: 'Acceso autorizado. Aquí están los datos sensibles.'
        });
    }

    async getLogout(req, res) {
        req.session.destroy(error => {
            if (error) return res.send({ status: 'error', data: { error } });
        });
        res.send('logout');
    }

    async postRegister(req, res) {
        const { first_name, last_name, user_name, email, password, phone } = req.body;

        if (!user_name || !email || !password) {
            return res.status(400).send('Nombre de usuario y email obligatorios!');
        }

        const userFound = await userRepository.getUser({ email });

        if (userFound) {
            return res.status(401).send({ status: 'error', error: 'El usuario ya existe' });
        }

        try {
            const newUser = {
                first_name,
                last_name,
                user_name,
                email,
                password: createHash(password),
                phone,
                role: 'user',  // Asegúrate de definir un valor por defecto si no está en req.body
                pets: []
            };

            await userRepository.create(newUser);
            res.redirect('/login');
        } catch (error) {
            console.error('Error en postRegister', error);
            res.status(500).send('Error registrando usuario');
        }
    }

    async postLogin(req, res) {
        const { user_name, password } = req.body;

        const userFound = await userRepository.getUser({ user_name });

        if (!userFound) {
            return res.status(400).send({ status: 'error', message: 'El usuario no existe' });
        }

        if (!isValidPassword(password, userFound.password)) {
            return res.status(401).send({ status: 'error', message: 'Nombre de usuario o contraseña incorrectos' });
        }

        try {
            const token = generateToken({
                id: userFound._id,
                role: userFound.role,
                user_name: userFound.user_name
            });

            res.cookie('token', token, {
                maxAge: 1000 * 60 * 60 * 24, // 1 día
                httpOnly: true,
                signed: true
            }).send({
                status: 'success',
                data: userFound,
                token
            });
        } catch (error) {
            res.status(500).send({ message: 'Error al iniciar sesión', error });
        }
    }

    async postChangePass(req, res) {
        const { user_name, newPassword } = req.body;

        if (!user_name || !newPassword) {
            return res.status(400).send({ status: 'error', message: 'El usuario y la nueva contraseña son requeridos.' });
        }

        const userFound = await userRepository.getUser({ user_name });

        if (!userFound) {
            return res.status(400).send({ status: 'error', error: 'El usuario no existe!' });
        }

        try {
            const passwordHashed = createHash(newPassword);
            const result = await userRepository.update(userFound._id, { password: passwordHashed });

            if (result.modifiedCount === 0) {
                return res.status(400).send({ status: 'error', message: 'No se pudo actualizar la contraseña!' });
            }

            return res.status(200).send({ status: 'success', message: 'Contraseña actualizada con éxito!', data: result });
        } catch (error) {
            return res.status(500).send({ status: 'error', message: 'Error al actualizar la contraseña!', data: error.message });
        }
    }
}

export const sessionController = new SessionController();