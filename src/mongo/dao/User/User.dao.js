  import { userModel } from '../../../models/user.model.js'

  class UserDAO {
      constructor() {
          this.model = userModel
      }

      getPaginatedUsers = async (options, filter = {}) => await this.model.paginate(filter, options)

      getAllUsers = async () => await this.model.find({})

      getUser = async filter => await this.model.findOne(filter)

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