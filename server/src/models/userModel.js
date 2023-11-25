import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import * as crypto from "crypto";

import {userRoles} from "../../constants.js"
import {createHashedToken} from "../utils/crypto.js";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true,"Email is required"],
        validate: [validator.isEmail,"Please write a correct email"]
    },
    photo: String,
    role: {
        type: String,
        enum: Object.values(userRoles),
        default: userRoles.buyer
    },
    password: {
        type: String,
        minlength: 5,
        select: false,
    },
    passwordConfirm : {
        type: String,
        minlength: 5,
        validate: {
            validator: function(val) {
                return val === this.password
            },
            message: 'Passwords are not equal'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    googleId: String
})

// hash password
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,16)
    this.passwordConfirm = undefined
    next()
})

//
userSchema.pre('save', function (next) {
    if(!this.isModified('password') || this.isNew) return next()
    this.passwordChangedAt = Date.now() - 1000
    next()
})

userSchema.pre(/^find/,function(next){
    this.find({active: {$ne: false}})
    next()
})


userSchema.methods.correctPassword = async (candidatePassword,userPassword) => {
    return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if(this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000,10)

        return  JWTTimestamp < changedTimestamp
    }

    return false;
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex")

    this.passwordResetToken = createHashedToken(resetToken)

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken;
}

export const User = mongoose.model('User',userSchema)