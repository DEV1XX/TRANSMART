const jwt = require('jsonwebtoken');


const authenticate = async (req,res,next) => {
 const token = req.cookies.token;
 if(!token){
     return res.status(401).json({ success: false,  message: "Unauthorised"});
 }
 try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET );
      // Attach the decoded user information to req.user
      req.user = {
        id: decoded.userId,  // userId from the token payload
        email: decoded.email // email from the token payload
    };
    next();
 } catch (error) {
    return res.status(500).json({ success: false,  message: "Authentication failed!"});
 }
};

module.exports = {authenticate};