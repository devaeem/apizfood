const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
     where: { username },
 });

 if(user){
  const isMatch = await bcrypt.compare(password,user.password)
  if(!isMatch){
   return res.status(400).send({msg:"รหัสผ่านไม่ตรงกัน"});
  }
  const payload = {
   user:{
     username: user.username,
     role:user.role
   }
  };
  jwt.sign(payload,"jwtSecret",{expiresIn: '24h'},(err,token)=>{

   if(err) throw err;
   res.json({data:{
      accessToken:token,
      username:payload.user.username,
      role:payload.user.role
   }})
  })

 } else{
  return res.status(400).send("User Not found!!!");
 }




    // res.status(200).json({
    //  msg: "Authentication successful",
    //  user,
    //  password: user.password
    // });
  } catch (err) {
    console.error("Error fetching banner:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};
