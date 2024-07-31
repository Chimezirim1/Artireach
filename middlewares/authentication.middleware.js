import jwt from "jsonwebtoken";
import UserService from "../services/user.service.js";

async function authenticate(req, res, next) {

    // console.log(req.cookies)
    //get the cookie
    const token = await req.cookies.token;

    //no cookie
    if (!token) {
        return res.status(401).send({
            success: false,
            message: "No token found, please log in"
        })
    }

    //find the cookie
    //decrypt the cookie
    jwt.verify(token, "secret", async (err, decoded) => {
        //if err we send an error response
        if (err) {
            return res.status(401).send({
                success: false,
                message: "Invalid token, please log in"
            })
        }

        //with the _id find the user in the database
        const user = await UserService.findOne({ _id: decoded._id })
        //user doesn't exist
        if(!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid id, please log in"
            })
        }
        //find the user
        req.user = user;
        next();
    })

}

export default authenticate;