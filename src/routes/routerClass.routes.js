import { Router } from 'express'
import { configObjet } from '../server/connection.db.js'

class RouterClass {
  constructor() {
      this.router = Router();
      this.init();
  }

  getRouter() {
      return this.router;
  }

  init() {
      // El método init puede ser sobrescrito por las clases hijas si es necesario
  }

  applyCallbacks(callbacks) {
      return callbacks.map(callback => async (...params) => {
          try {
              await callback.apply(this, params);
          } catch (error) {
              console.log(error);
              params[1].status(500).send(error);
          }
      });
  }

  generateCustomResponse(req, res, next) {
      res.sendSuccess = data => res.send({ status: 'success', data });
      res.sendServerError = error => res.send({ status: 'error', error });
      res.sendUserError = error => res.send({ status: 'error', error });
      next();
  }

  // Cambiar el middleware de handlePolicies para que no haga nada
  handlePolicies = policies => (req, res, next) => {
      return next(); // Ya no bloquea el acceso, simplemente pasa al siguiente middleware
  };

  get(path, policies, ...callbacks) {
      this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks));
  }

  post(path, policies, ...callbacks) {
      this.router.post(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks));
  }

  put(path, policies, ...callbacks) {
      this.router.put(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks));
  }

  delete(path, policies, ...callbacks) {
      this.router.delete(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks));
  }
}

export {
    RouterClass
}