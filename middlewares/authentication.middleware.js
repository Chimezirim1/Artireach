import jwt from 'jsonwebtoken';
import UserService from '../services/user.service.js';

function authenticate(allowedUserTypes = []) {
  return function(req, res, next) {
    console.log('Authentication middleware triggered');

    // Get user token from cookie or authorized header
    let token = req.cookies.myToken || req.headers.authorization;
    console.log('Extracted token:', token);
    // If token is in the authorization header, remove the bearer prefix
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      console.log('Token after removing Bearer prefix:', token);
    }

    // If no token
    if (!token) {
      console.log('No token found');
      return res.status(401).send({
        success: false,
        message: "No token found, please log in",
      });
    }

    // Found token? Decrypt the token
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      // If error (expired cookie?)
      if (err) {
        console.log('Error verifying token:', err.message);
        return res.status(401).send({
          success: false,
          message: "Invalid token, please log in",
        });
      }

      // With the email returned from the token, find the user in the database
      const user = await UserService.findUser({ email: decoded.email });

      // If user does not exist (deleted user?)
      if (!user) {
        console.log('User not found in the database');
        return res.status(401).send({
          success: false,
          message: "Invalid email, please sign up",
        });
      }
      console.log('User found:', user); // Log found user
      // Attach user to the request object using req.user
      req.user = user;

      // Check if user has the right role (if any roles are specified)
      if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(user.role)) {
        console.log('Unauthorized role access attempt'); // Log unauthorized access
        return res.status(403).send({
          success: false,
          message: "Unauthorized access",
        });
      }

      // If no roles are specified or the user has the correct role, proceed
      console.log('User authorized, proceeding to next middleware');
      next();
    });
  };
}

export { authenticate };
// import jwt from 'jsonwebtoken';
// import UserService from '../services/user.service.js';

// function authenticate (allowedUserTypes = []) {


//    return function(req, res, next) {
//     //get user token from cookie or authorized header
//     let token = req.cookies.myToken || req.headers.authorization;

  
//       //if token is in the authorization header, remove the bearer prefix if present
//       if (token && token.startsWith("Bearer ")) {
//         token = token.slice(7, token.length)
//       }
  
//       //if no cookie
//       if (!token) {
//         return res.status(401).send({
//           success: false,
//           message: "No token found, please log in",
//         });
//       }
  
//       //found token? decrypt the token
//       jwt.verify(token, process.env.SECRET, async (err, decoded) => {
//         //if error (expired cookie?)
//         if (err) {
//           return res.status(401).send({
//             success: false,
//             message: "Invalid token, please log in",
//           });
//         }
  
//         //with the email returned from the token, find the user in the database
//         const user = await UserService.findUser({ email: decoded.email });
//         //if user does not exist (deleted user?)
//         if (!user) {
//           return res.status(401).send({
//             success: false,
//             message: "Invalid email, please sign up",
//           });
//         }
//         //attach user to the rrequest object using req.user
//         req.user = user;
  
//         //check if user has the right role
//         if (allowedUserTypes.length === 0 || allowedUserTypes.includes(user.role)) {
//           next();
//         } else {
//           return res.status(403).send({
//             success: false,
//             message: "Unauthorized access",
//           });
//         }
//       });
//     };

//   };
  
//   export { authenticate };