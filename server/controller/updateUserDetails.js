const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")
const UserModel = require("../models/UserModel")

async function updateUserDetails(request, response) {
    try {
        const token = request.cookies.token || ""

        const user = await getUserDetailsFromToken(token)

        const { name, profile_pic } = request.body

        const updateUser = await UserModel.updateOne({ _id: user._id }, {
            name,
            profile_pic
        })

        const userInfomation = await UserModel.findById(user._id)

        return response.json({
            message: "User updated successfully",
            data: userInfomation,
            success: true
        })

    } catch (error) {
        console.error("Error updating user details:", error)
        return response.status(500).json({
            message: "An error occurred while updating user details. Please try again later.",
            error: true
        })
    }
}

module.exports = updateUserDetails