import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import { USER_ROLES } from "../utils/user.js";
class UserService {
  // create new user
  async createUser(userData) {
    const newUser = await UserModel.create(userData);
    return newUser;
  }

  // retrieve all users
  async findUsers(query) {
    const users = await UserModel.find(query).populate('serviceType');
    return users;
  }

  // retrieve one user
  async findUser(query) {
    const user = await UserModel.findOne(query);
    return user;
  }

  // update a user by id
  async updateUser(id, data) {
    // Check if any of the fields that require a profile update are being modified
    const updateFields = ['name', 'email', 'address', 'state', 'serviceType', 'serviceTimeStart', 'serviceTimeEnd', 'bio', 'workPhoto', 'credentials'];
    const isUpdatingProfile = updateFields.some(field => data.hasOwnProperty(field));

    if (isUpdatingProfile) {
        data.isProfileUpdated = true;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true });
    return updatedUser;
}

  // delete user by id.....check out soft delete
  async delUser(id) {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    return deletedUser;
  }

  
  async getArtisansByServiceId(serviceId){
    const artisans = await UserModel.find({
      role: USER_ROLES.ARTISAN,
      serviceType: serviceId
    })
    if (artisans.length === 0) {
      return []; 
  }
    return artisans;
}

// retrieve all client users
async findAllClients() {
  const clients = await UserModel.find({ role: USER_ROLES.CLIENT });
  return clients;
}

//retrieve all artisan users
async findAllArtisans() {
  const artisans = await UserModel.find({ role: USER_ROLES.ARTISAN });
  return artisans;
}


 // Count users by a specific query
 async countUsers(query) {
  return await UserModel.countDocuments(query);
}
// get artisan by id
}

export default new UserService();
