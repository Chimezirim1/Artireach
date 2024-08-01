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

   
}

export default new UserService();
// async create(data) {
//     const user = await UserModel.create(data);
//     return user;
// }

// async findByQuery(query) {
//     const user = await UserModel.findByQuery(query);
//     // if (!user) {
//     //     throw new Error('User not found');
//     // }
//     return user;
// }

// async update(query, data) {
//     // // If updating the password, hash it first
//     // if (data.password) {
//     //     const saltRounds = 10; 
//     //     const hashedPassword = await bcrypt.hash(data.password, saltRounds);
//     //     data.password = hashedPassword;
//     // }
    
//     const user = await UserModel.findByQueryAndUpdate(query, data, { new: true });
//     // if (!user) {
//     //     throw new Error('User not found');
//     // }
//     return user;
// }

// async delete(id) {
//     const user = await UserModel.findByQueryAndDelete(query);
//     // if (!user) {
//     //     throw new Error('User not found');
//     // }
//     return user;
// }

// // async authenticate(email, password) {
// //     const user = await UserModel.findOne({ email: email });
// //     if (!user) {
// //         throw new Error('User not found');
// //     }

// //     const isValidPassword = await bcrypt.compare(password, user.password);
// //     if (!isValidPassword) {
// //         throw new Error('Incorrect password');
// //     }
// //     return user; 
// // }