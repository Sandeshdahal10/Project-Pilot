import jwt from "jsonwebtoken";
import {asyncHandler} from "./asyncHandler.js";
import {Errorhandler} from "./error.js";
import User from "../models/user.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;
    if(!token){
        return next(new Errorhandler("Please login to access this resource", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-resetPasswordToken -resetPasswordExpire");
    if(!req.user){
        return next(new Errorhandler("User not found with this Id", 404));
    }
    next();
});