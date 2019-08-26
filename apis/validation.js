module.exports = function verifyToken(request, response, next){
    //Request header with authorization key
    const bearerHeader = request.headers['authorization']; 
    //Check if there is  a header
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        //Get Token arrray by spliting
        const bearerToken = bearer[1];
        request.token = bearerToken;
        //call next middleware
        next();
    }
    else{
        response.sendStatus(403);
    }
 }