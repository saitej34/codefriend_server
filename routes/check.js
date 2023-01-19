const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {
    const token = req.header('token');
    if(!token)
    {
        return res.json({"status":"token not found"})
    }
    const ids = jwt.verify(token,"saiteja")
    req.user = ids.user.id;
    next();
}
