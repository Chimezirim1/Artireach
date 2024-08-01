import UserService from "../services/user.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {

    async signUp(req, res) {
        //get the user from req.body
        const userData = req.body;

        //validate unique fields
        const user = await UserService.findOne({ email: userData.email })
        if (user) {
            return res.status(409).send({
                message: "Duplicate email",
                status: 409 
            })
        }
        console.log('Email already', user)

        //encrypt the password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(userData.password, salt);

        //create the new user
        const newUser = await UserService.create({
            email: userData.email,
            password: encryptedPassword,
            role: userData.role,
        });

        //create a token which is used to validate the user is a valid user
        const token = jwt.sign({
            email: newUser.email,
            role: newUser.role
        },
            "secret",
            { expiresIn: 3 * 24 * 60 * 60 }
        );

        //pass the cookie to the frontend which keeps the user logged in for a certain period of time
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000
        })


        //send back a response with the user details
        return res.status(201).send({
            success: true,
            message: "User successfully signed up",
            newUser
        })
    }

    async login(req, res) {
        //get the user from req.body
        const userData = req.body;

        //check the database for the user using the email
        const user = await UserService.findOne({
            email: userData.email
        })

        //compare the password in the database with the one the ine the user provides
        const isValidPassword = await bcrypt.compare(userData.password, user.password);

        //if the password is different we stop the user frim logging in
        if (!isValidPassword) {
            return res.status(400).send({
                success: false,
                message: "Invalid credentials"
            })
        }

        //create a token which is used to validate the user is a valid user
        const token = jwt.sign({
            _id: user._id,
            email: user.email
        },
            "secret",
            { expiresIn: 3 * 24 * 60 * 60 }
        );

        //pass the cookie to the frontend which keeps the user logged in for a certain period of time
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000
        })

        //send back a response with the user details
        return res.status(200).send({
            success: true,
            message: "User successfully logged in",
            user
        })
    }
}

export default new AuthController();

