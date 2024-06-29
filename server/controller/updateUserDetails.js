const UserModel = require("../models/UserModel")
const jwt = require("jsonwebtoken");

async function updateUserDetails(request,response){
    try {
        const token = request.cookies.token || ""

        const user = await getUserDetailsFromToken(token);


        const { name, profile_pic } = request.body;


        const updateUser = await UserModel.updateOne({ _id : user._id },{
            name,
            profile_pic
        })

        const userInfomation = await UserModel.findById(user._id)

        return response.json({
            message : "user update successfully",
            data : userInfomation,
            success : true
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

module.exports = updateUserDetails