import UserService from "../services/user.service.js";
import { USER_ROLES } from "../utils/user.js";

class UserController {
  // // create new user
  // async createUser(req, res) {
  //   const { body } = req;
  //   body.email = body.email.toLowerCase();

  //   // check if user is already registered
  //   const existingUserEmail = await UserService.findUser({
  //     email: body.email,
  //   });
  //   if (existingUserEmail) {
  //     return res.status(404).send({
  //       success: false,
  //       message: "User already exists",
  //     });
  //   }
  //   // create user
  //   const newUser = await UserService.createUser({ body });
  //   res.status(200).send({
  //     success: true,
  //     message: "User successfully created",
  //     data: newUser,
  //   });
  // }

  //find all users
  // async findUsers(req, res) {
  //   // const { query } = req;
  //   const users = await UserService.findUsers();
  //   res.status(200).send({
  //     success: true,
  //     message: "All users successfully retrieved",
  //     data: users,
  //   });
  // }

  // async findUsers(req, res) {
  //   const { role, specialty } = req.query;
  //   const query = {};
  //   if (role) {
  //     query.role = role;
  //     query.specialty = specialty;
  //   }
  //   const users = await UserService.findUsers(query);
  //   res.status(200).send({
  //     success: true,
  //     message: "All users successfully retrieved",
  //     data: users,
  //   });
  // }

  //retrieve all users

  async findUsers(req, res) {
    const query = req?.query || {}

    const users = await UserService.findUsers(query);
    res.status(200).send({
      success: true,
      message: "All users successfully retrieved",
      data: users,
    });
  }

  //find a user
  async findUser(req, res) {
    const id = req.params.id;
    const user = await UserService.findUser({ _id: id });
    res.status(200).send({
      success: true,
      message: "User successfully retrieved",
      data: user,
    });
  }

  // //update user
  // async updateUser(req, res) {
  //   console.log("updateUser")
  //   const { id } = req.params;
  //   const updatedUser = await UserService.updateUser(id, req.body);
  //   res.status(200).send({
  //     success: true,
  //     message: "User updated successfully",
  //     data: updatedUser,
  //   });
  // }
  async updateUser(req, res) {
    const { id } = req.params;
    const updatedUser = await UserService.updateUser(id, req.body);
    res.status(200).send({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
    });
}


  //delete user
  async delUser(req, res) {
    const userId = req.params.id;
    const deletedUser = await UserService.delUser(userId);
    res.status(200).send({
      success: true,
      message: "Changes saved successfully",
      data: deletedUser,
    });
  }

  async getArtisansByServiceId(req, res) {
    const serviceId = req.params.serviceId;

    const artisans = await UserService.getArtisansByServiceId(serviceId);

    return res.status(200).send({
      success: true,
      artisans,
    });
  }

   // retrieve all client users
   async getAllClients(req, res) {
    const clients = await UserService.findAllClients();
    res.status(200).send({
      success: true,
      message: "All clients successfully retrieved",
      data: clients,
    });
  }
  
  async getAllArtisans(req, res) {
    const artisans = await UserService.findAllArtisans();
    res.status(200).send({
      success: true,
      message: "All artisans successfully retrieved",
      data: artisans,
    });
  }

  // Retrieve total number of clients
  async getTotalClients(req, res) {
    try {
      const totalClients = await UserService.countUsers({ role: USER_ROLES.CLIENT });
      res.status(200).send({
        success: true,
        message: "Total number of clients retrieved successfully",
        totalClients,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error retrieving total number of clients",
        error: error.message,
      });
    }
  }

  // Retrieve total number of artisans
  async getTotalArtisans(req, res) {
    try {
      const totalArtisans = await UserService.countUsers({ role: USER_ROLES.ARTISAN });
      res.status(200).send({
        success: true,
        message: "Total number of artisans retrieved successfully",
        totalArtisans,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error retrieving total number of artisans",
        error: error.message,
      });
    }
  }
}



export default new UserController();
