import express from "express";
import passport from "passport";

import {
    checkIfFieldsAreUpdatable,
    clearUsers, deactivateCurrUser, deleteUser,
    forgotPassword, getCurrUser, getUser,
    getUsers,
    login,
    resetPassword, resizeUserImage,
    signUp, signUpWithGoogle,
    updatePassword, updateUserData, uploadImageFile
} from "../controllers/userController.js";
import {protect, restrictTo} from "../controllers/authController.js";

export const userRouter = express.Router()
export const authRouter = express.Router()

// GOOGLE AUTH
authRouter.get('/login/failed', (req, res) => {
    res.status(401).json({
        status: 'fail',
        message: "login Fail"
    })
})

authRouter.get(
    '/google/callback',
    passport.authenticate("google", {failureRedirect: '/login/failed'}),
    signUpWithGoogle
)
///////

userRouter.post(
    '/signup',
    uploadImageFile,
    resizeUserImage,
    signUp
)
userRouter.post('/login', login)
userRouter.post('/forgotPassword', forgotPassword)
userRouter.patch('/resetPassword/:token', resetPassword)
userRouter
    .route('/')
    .get(getUsers)
    .delete(protect, restrictTo("admin"),
        clearUsers
    )

userRouter.use(protect)

userRouter.patch('/updatePassword', updatePassword)
authRouter.get('/google',
    passport.authenticate('google', {scope: ['profile', 'email']})
);
userRouter.get('/me', getCurrUser, getUser)

userRouter.patch(
    '/updateUserData',
    uploadImageFile,
    resizeUserImage,
    checkIfFieldsAreUpdatable,
    updateUserData
)

userRouter.delete('/deleteCurrUser', deactivateCurrUser)
userRouter.delete(
    '/:id',
    restrictTo('admin', 'lead-guide'),
    deleteUser
)
