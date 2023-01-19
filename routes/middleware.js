const jwt = require('jsonwebtoken')

module.exports = function(req,res,next)
{
    try 
    {
        const token = req.header('token')
        if(!token)
        {
            res.json({"message":"Token Not found"});
        }
        const det = jwt.verify(token,"saiteja");
        req.user = det.user;
        next();
    }
    catch{
        console.log("error");
    }
}