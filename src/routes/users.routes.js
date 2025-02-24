import { RouterClass } from './routerClass.routes.js';
import { GetUser, PostUser, PutUser, DeleteUser } from '../controllers/User/User.controller.js';
import { authorization } from '../middlewares/authorization.middleware.js';

class UserRoute extends RouterClass {
    init() {
        this.get('/', [], GetUser);   // Ruta sin protección
        this.post('/', [], PostUser); // Ruta sin protección
        this.put('/:uid', [], PutUser); // Ruta sin protección
        this.delete('/:uid', [], DeleteUser); // Ruta sin protección
    }
}

export { UserRoute };