import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import isEmail from "validator/lib/isEmail.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";


const generateAccessandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
    
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();
    
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(400, "Access and refresh token generation error")
    }
}


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    //check presence
    if (!fullName || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    //check empty string
    if ([fullName, email, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    if (!isEmail(email)) {
        throw new ApiError(400, "Enter a valid email")
    }

    const existingUser = await User.exists({ email: email });

    if (existingUser) {
        throw new ApiError(409, "User already exist with this email")
    }

    const newUser = await User.create({
        fullName,
        email,
        password
    })

    if (!newUser) {
        throw new ApiError(500, "User registration failed")
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(newUser?._id)

    const user = await User.findById(newUser?._id).
        select("-password -refreshToken")

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                {user, accessToken, refreshToken},
                "User registered successfully"
            )
        )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    if ([email, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    if (!isEmail(email)) {
        throw new ApiError(400, "Enter a valid email")
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        throw new ApiError(400, "User not found")
    }

    const isPasswordValid = await existingUser.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials")
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(existingUser?._id)

    existingUser.refreshToken = refreshToken;
    await existingUser.save({ validateBeforeSave: false })

    const user = await User.findById(existingUser._id).
        select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user, accessToken, refreshToken },
                "User logged In successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1
            }
        }
    )

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Missing refresh token")
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token either expired or rotated")
        }

        const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {accessToken, refreshToken},
                    "Access token refreshed successfully"
                )
            )

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const getUserById = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const user = await User.findById(userId).select("-password -refreshToken")
    if(!user) {
        throw new ApiError(404, "User not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "User fetched successfully"
        )
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getUserById
}