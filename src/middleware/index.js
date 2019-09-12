const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = {
    isLoggedIn : function(req,res,next){
        let { token } = req.headers;
        if(!token) return res.status(401).json({success : false,message : 'You must be logged in to do that (No token sent)'});

        jwt.verify(token,config.JWT_SECRET,(err,decodedToken) => {
            if(err) return res.status(401).json({success : false,message : 'Invalid or malformed token'});
            if(!decodedToken) return res.status(401).json({success : false,message : 'Unauthorized'});
            req.userId = decodedToken.userId;
            return next();    
        })
    },
    validateUserRole: function(req, res, next){
        if(req.body.userRole != 'admin'){
            (() => res.status(401).send({ success: false, message: 'User is not authorized to access this endpoint' }))();
            return false;
        }
        return next();
    }
}