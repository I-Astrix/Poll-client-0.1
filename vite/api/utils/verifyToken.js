const jwt = require('jsonwebtoken');
const JWT_SECRET = 'alongsecurestringfromjwtsecret';



module.exports = function verifyToken(req, res, next){
 
    const token = req.cookies.poll_access;
    
    if(!token){
        return res.status(400).json({error: "Not Authenticated"});
    }
    else{
        jwt.verify(token, JWT_SECRET, (err, user)=>{
            if(!err){
                req.user = user;
                next();      
            }
        })
    }
}





