
const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{

try{
    const {authorization}=req.headers;
    const signedata=jwt.verify(authorization,"secret_admin");
    req.signedata=signedata;
    next();
}catch(err){
    console.error(err);
    res.statusCode=401;
    res.json({Message:"Authentication failed"});
}


}