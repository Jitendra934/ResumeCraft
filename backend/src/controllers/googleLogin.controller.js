import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            throw new ApiError(400, "Google token is required")
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name, picture } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                fullName: name,
                email,
                avatar: picture,
            });
        }

        const accessToken = user.generateAccessToken(user._id);
        const refreshToken = user.generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken, user },
                    "Google login successful",
                )
            );
    } catch (error) {
        console.error("Google Login Error:", error);
        return res.status(401).json({
            message: "Invalid Google token",
        });
    }
};