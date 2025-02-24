import { RouterClass } from './routerClass.routes.js'

class UserRoute extends RouterClass {


    init() {
        this.get('/', ['user'], async (req, res) => {
            try {
                res.sendSuccess('datos sensibles')
                
            } catch (error) {
                res.sendServerError(error)
            }
        })
    }
}

export {
    UserRoute
}