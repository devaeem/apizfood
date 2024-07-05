const jwt = require("jsonwebtoken");

exports.auth = (req, res, next)=>{

 try{
  const token = req.headers["authtoken"]
  if(!token){
     return res
     .status(401)
     .send('no Token , authorization denied');
  }
  const decoded = jwt.verify(token,'jwtSecret')
  req.user = decoded.user
  next()

 }catch(err){
     console.log(err)
     return res
     .status(401)
     .send('Token Invavid!!!');
 }
}