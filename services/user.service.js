import UserModel from '../models/user.model.js';

class UserService {
    async create(data) {
        const user = await UserModel.create(data);
        return user;
    }

    async findOne(query) {
        const user = await UserModel.findOne(query);
        return user;
    }

   async updateUser(data, id){
    const user = await UserModel.findByIdAndUpdate(data, id, { new: true });
    return user;
   }

   async deleteUser(id){
    const user = await UserModel.findByIdAndDelete(id);
    return user;
   }

}

export default new UserService();
