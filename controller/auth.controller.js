import UserService from "../services/user.service.js";
import { encryptData, decryptData, generateUserToken } from "../utils/dataCrypto.js";
import { USER_ROLES } from "../utils/user.js";
class AuthController {

 

    async createAdmin(req,res){
        const {body} = req
        body.email = body.email.toLowerCase();

        //hash password
        const hashedPassword = await encryptData(body.password);
    
        //create new user
        const newAdmin = await UserService.createUser({
          ...body,
          password: hashedPassword,
          role: USER_ROLES.ADMIN,
        });
        return res.status(201).send({
      success: true,
      message: "User successfully registered",
      data: newAdmin,
    });
    }



    async createArtisan(req,res){
            //get user data from req.body
            const { body } = req;
            body.email = body.email.toLowerCase();
        
            // check if user is already registered
            // check if email is already registered
            const existingUserEmail = await UserService.findUser({
              email: body.email,
            });
            if (existingUserEmail) {
              return res.status(404).send({
                success: false,
                message: "Email already exists",
              });
            }
            // check if phoneNumber is already registered
            // const existingUserPhoneNumber = await UserService.findUser({
            //   phoneNumber: body.phoneNumber,
            // });
            // if (existingUserPhoneNumber) {
            //   return res.status(404).send({
            //     success: false,
            //     message: "Phone number already exists",
            //   });
            // }
        
            //hash password
            const hashedPassword = await encryptData(body.password);
        
            //create new user
            const newUser = await UserService.createUser({
              ...body,
              password: hashedPassword,
              role: USER_ROLES.ARTISAN,
            });
        
            //create token as cookie to user
            const token = generateUserToken(newUser);
        
            //return created token as cookie to user
            res.cookie("myToken", token, {
              httpOnly: true,
              maxAge: 604800000,
            });
        
            return res.status(201).send({
              success: true,
              message: "User successfully registered",
              data: newUser,
            });
          
        
    }

    async createUser(req,res){
        const { body } = req;
    body.email = body.email.toLowerCase();
      // return res.send(req.body)
    // check if user is already registered
    // check if email is already registered
    const existingUserEmail = await UserService.findUser({
      email: body.email,
    });
    if (existingUserEmail) {
      return res.status(404).send({
        success: false,
        message: "Email already exists",
      });
    }

    // check if phoneNumber is already registered
    // const existingUserPhoneNumber = await UserService.findUser({
    //   phoneNumber: body.phoneNumber,
    // });
    // if (existingUserPhoneNumber) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "Phone number already exists",
    //   });
    // }

    //hash password
    const hashedPassword = await encryptData(body.password);

    //create new user
    const newUser = await UserService.createUser({
      ...body,
      password: hashedPassword,
      role: USER_ROLES.CLIENT,
    });

    //create token as cookie to user
    const token = generateUserToken(newUser);

    //return created token as cookie to user
    res.cookie("myToken", token, {
      httpOnly: true,
      maxAge: 604800000,
    });

    return res.status(201).send({
      success: true,
      message: "User successfully registered",
      data: newUser,
    });
    }

    async login(req, res) {
        //user data from req.body
        const { body } = req;
        body.email = body.email.toLowerCase();
    
        //compare login email and sign up email
        //retrieve data from database
        const user = await UserService.findUser({
          email: body.email,
        });
        //if data does not exist on the database
        if (!user) {
          return res.status(400).send({
            success: false,
            message: "invalid email",
          });
        }
    
        //compare login password with sign up password
        //compare password with user saved password
        const isValidPassword = await decryptData(body.password, user.password);
        //if not valid password
        if (!isValidPassword) {
          return res.status(400).send({
            success: false,
            message: "Invalid password",
          });
        }
    
        //create token and assign it to the email
        const token = generateUserToken(user);
    
        //pass token as cookie
        res.cookie("myToken", token, {
          httpOnly: true,
          maxAge: 604800000,
        });
    
        return res.status(200).send({
          success: true,
          message: "User successfully logged in",
          data: user,
          myToken: token
        });
      }
    
      /***** LOGOUT *****/
      // logout users
      async logout(req, res) {
        res.cookie("myToken", "", {
          httpOnly: true,
          expiresIn: new Date(0),
          // maxAge: new Date(0),
        });
    
        return res.status(200).send({
          success: true,
          message: "User successfully logged out"
        });
      }
    

}

export default new AuthController();

   // async signUp(req, res) {
    //     //get the user from req.body
    //     const userData = req.body;

    //     //validate unique fields
    //     const user = await UserService.findOne({ email: userData.email })
    //     if (user) {
    //         return res.status(409).send({
    //             message: "Duplicate email",
    //             status: 409 
    //         })
    //     }

    //     //encrypt the password
    //     const salt = await bcrypt.genSalt(10);
    //     const encryptedPassword = await bcrypt.hash(userData.password, salt);

    //     //create the new user
    //     const newUser = await UserService.create({
    //         name: userData.name,
    //         email: userData.email,
    //         password: encryptedPassword,
    //         role: userData.role,
    //     });

    //     //create a token which is used to validate the user is a valid user
    //     const token = jwt.sign({
    //         name: newUser.name,
    //         email: newUser.email,
    //         role: newUser.role
    //     },
    //         "secret",
    //         { expiresIn: 3 * 24 * 60 * 60 }
    //     );

    //     //pass the cookie to the frontend which keeps the user logged in for a certain period of time
    //     res.cookie("token", token, {
    //         httpOnly: true,
    //         maxAge: 3 * 24 * 60 * 60 * 1000
    //     })


    //     //send back a response with the user details
    //     return res.status(201).send({
    //         success: true,
    //         message: "User successfully signed up",
    //         newUser
    //     })
    // }

    // async login(req, res) {
    //     //get the user from req.body
    //     const userData = req.body;

    //     //check the database for the user using the email
    //     const user = await UserService.findOne({
    //         name: userData.name,
    //         email: userData.email
    //     })

    //     //compare the password in the database with the one the ine the user provides
    //     const isValidPassword = await bcrypt.compare(userData.password, user.password);

    //     //if the password is different we stop the user frim logging in
    //     if (!isValidPassword) {
    //         return res.status(400).send({
    //             success: false,
    //             message: "Invalid credentials"
    //         })
    //     }

    //     //create a token which is used to validate the user is a valid user
    //     const token = jwt.sign({
          
    //         email: user.email,
    //         _id: user._id
    //     },
    //         "secret",
    //         { expiresIn: 3 * 24 * 60 * 60 }
    //     );

    //     //pass the cookie to the frontend which keeps the user logged in for a certain period of time
    //     res.cookie("token", token, {
    //         httpOnly: true,
    //         maxAge: 3 * 24 * 60 * 60 * 1000
    //     })

    //     //send back a response with the user details
    //     return res.status(200).send({
    //         success: true,
    //         message: "User successfully logged in",
    //         user
    //     })
    // }