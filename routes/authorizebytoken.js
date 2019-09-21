const jwt = require('jsonwebtoken');


module.exports = (req , res , next) => {

    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).json({
            message : "Access Deniad"
        });
    }
    jwt.verify(token , 'somethingSECRET' , (err , decoded) => {
        if(err){
            return res.status(401).json({
                message : "Access Deniad"
            });
        }
        req.user = decoded;
        next();
    });
}


