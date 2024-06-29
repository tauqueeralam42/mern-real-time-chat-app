const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')


async function userDetails(request,response){
    try {
        const token = request.cookies.token || ""

        const user = await getUserDetailsFromToken(token)

        return response.status(200).json({
            message : "user details",
            data : user
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

const getUserDetailsFromToken = async(token)=>{
    
    if(!token){
        return {
            message : "session out",
            logout : true,
        }
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECREAT_KEY);
        const user = await UserModel.findById(decoded.id).select('-password');
        return user;
    } catch (error) {
        console.error("Error verifying token:", error.message);
        return null; 
    }
}



module.exports = userDetails