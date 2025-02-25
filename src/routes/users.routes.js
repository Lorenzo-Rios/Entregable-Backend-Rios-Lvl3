import { RouterClass } from './routerClass.routes.js';
import { GetUser, PostUser, PutUser, DeleteUser } from '../controllers/User/User.controller.js';
import { authorization } from '../middlewares/authorization.middleware.js';
import { passportCall } from '../passport/passportCall.js'

class UserRoute extends RouterClass {
    init() {
        this.get('/', [], GetUser);   
        this.post('/', [], PostUser); 
        this.put('/:uid', [], PutUser); 
        this.delete('/:uid', [], DeleteUser); 
    }
}

export { UserRoute };