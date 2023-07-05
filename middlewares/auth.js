import jwt from 'jsonwebtoken';
export const isAuth=(req,res,next)=>{
  const token=req.headers.authorization;
  if(token){
    const t=token.slice(7,token.length);
jwt.verify(t,process.env.JWT_SECRET,(err,decode)=>{
    if(err){
        res.status(401).send({message:'Invalid Token'})
    }else{
      const { exp } = decode;
      const expirationTime = new Date(exp * 1000);
      const currentTime = new Date();
      if (currentTime > expirationTime) {
        // Token has expired
        res.status(401).send({ message: 'Token has expired' });
      } else {
        req.user=decode;
        next()
        // Token is valid, proceed with authorization
        // ...
      }
      
        
        
    }
});
    
}else{
    res.status(401).send({message:"No Token"})
}

}
export function authorizeDoctor(req, res, next) {
    const { user } = req;
    if (user.role === 'doctor') {
      next(); 
    } else {
      res.status(403).json({ message: 'Unauthorized access' }); // Role is not authorized, send a 403 forbidden response
    }
  }
  export function AuthAdmin(req, res, next) {
    const { user } = req;
    if (user.role === 'admin') {
      next(); 
    } else {
      res.status(403).json({ message: 'Unauthorized access' }); // Role is not authorized, send a 403 forbidden response
    }
  }