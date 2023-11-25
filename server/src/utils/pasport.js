import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import session from "express-session";
import {app} from "../../app.js";
import dotenv from "dotenv";

dotenv.config({path: './config.env'});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            scope: ["profile", "email"]
        },
        function (accessToken, refreshToken, profile, callback) {
            callback(null, profile)
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

