import { userModel } from '../../../models/user.model.js'

class UserDAO {
  constructor() {
      this.model = userModel
    }

    getPaginatedUsers = async (filter, options = {}) => {
      const users = await this.model.paginate(filter, {
          ...options,
          populate: { path: 'pets', select: 'name species date status' }
      });
      console.log(users); 
      return users;
    };

    getUser = (filter) => this.model.findOne(filter)
     
    getAllUsers = async () => await this.model.find({})

    createUser = async newUser => await this.model.create(newUser)

    updateUser = async (userId, updateData) => {
      return await this.model.updateOne({ _id: userId }, { $set: updateData });
    }

    deleteUser = async  (userId) => await this.model.findByIdAndDelete(userId)

    addPetToUser = async (userId, petId) => {
      return await this.model.updateOne(
          { _id: userId },
          { $push: { pets: petId } } // Agrega el petId al array de pets del usuario
      );
    }
  }

  export {
      UserDAO
  }