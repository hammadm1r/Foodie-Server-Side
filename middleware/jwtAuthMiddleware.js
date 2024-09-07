const jwt = require('jsonwebtoken')
const { error } = require("../utils/responseWrapper");
const { success } = require("../utils/responseWrapper");

const verifyjwt = (req,res,next) =>{
    if (
        !req.headers ||
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")
      ) {
        //  return res.status(401).send('Authorization Header is Required');
        return res.send(error(401,'Authorization Header is Required'));
      }
      const token = req.headers.authorization.split(" ")[1];

      try {
        const response = jwt.verify(token,process.env.SECRET_KEY);
        req.user = response;
        next();
      } catch (e) {
        return res.send(error(401,'Invalid Tokken'));
      }

}


const signjwt = (user_id) =>{
    return jwt.sign({user_id}, process.env.SECRET_KEY);
}
module.exports = {signjwt,verifyjwt};