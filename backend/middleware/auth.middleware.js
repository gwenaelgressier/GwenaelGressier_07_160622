const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt; //recupere le token dans les cookies
    if (token) {
        jwt.verify(
            token,
            process.env.TOKEN_SECRET,
            async (err, decodedToken) => {
                if (err) {
                    res.locals.user = null;
                    res.cookie("jwt", "", { maxAge: 1 }); //si une err sur le token, on supprime le cookie
                    next();
                } else {
                    let user = await UserModel.findById(decodedToken.id);
                    res.locals.user = user;
                    console.log(user);
                    next();
                }
            }
        );
    } else {
        res.locals.user = null;
        next();
    }
};

//Verification de l'existence et de la validité du token de l'utilisateur
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(
            token,
            process.env.TOKEN_SECRET,
            async (err, decodedToken) => {
                if (err) {
                    console.log(err);
                    res.send(200).json("no token");
                } else {
                    console.log(decodedToken.id);
                    next();
                }
            }
        );
    } else {
        console.log("no token");
    }
};
