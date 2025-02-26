import mongoose from 'mongoose';
import Assert from 'node:assert'

const { UserDAO } = await import('../src/mongo/dao/User/User.dao.js')

mongoose.connect('mongodb+srv://Lorenzo:lorenzorios123.@app-eccomerce.hnbuh.mongodb.net/test')

const assert = Assert.strict

describe('Testing de UserDAO', function () {
  before( function () {
    this.usersDao = new UserDAO()
  })

  beforeEach( function () {
    this.timeout(5000)
  })

  it('El Dao debe obtener todos los uruarios en formato de arreglo', async function() {
    console.log(this.usersDao)
    
    const result = await this.usersDao.getAllUsers()
    assert.strictEqual(Array.isArray(result), true)
  })
})