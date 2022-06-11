// TODO 7: Add auth middleware
module.exports = function auth(req,res,next){
    let error = Error("not authorized");
    error.statusCode = 403;

    if(!req.headers.size){
        throw error
    }
    if (!req.headers.authorization){
        throw error;
    }
    if(req.headers.authorization.indexOf("Bearer") === -1){
        throw error;
    }

    let token = req.headers.authorization.split("Bearer ");
    if(token[1] !== "may_the_forces_be_with_you"){
        throw error;
    }
    next();
}

