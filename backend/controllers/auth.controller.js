const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors } = require("../utils/errors.utils");
const { signInErrors } = require("../utils/errors.utils");

//temps en millisecondes: 1000ms(=1seconde) * 60s(=1minute) * 60min(=1heure) * 24heures. Le token sera donc valable durant 24h
const maxAge = 1000 * 60 * 60 * 24;
/**
 * fonction qui permet de creer un token
 *
 * @param {*} id
 * @returns
 */
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge,
    });
};

/**
 * fonction qui permet de créer un nouvel utilisateur
 *
 * @param {*} req
 * @param {*} res
 */
module.exports.signUp = async (req, res) => {
    const { pseudo, email, password } = req.body;

    try {
        /*Lorsqu'on veut créer un utilisateur, ces trois éléments
         obligatoires doivent être présents, sinon ça passe au catch en dessous.*/
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors });
    }
};

/**
 * fonction qui permet de se connecter
 *
 * @param {*} req
 * @param {*} res
 */
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = signInErrors(err);

        res.status(200).json({ errors });
    }
};

/**
 * fonction qui permet de se déconnecter
 *
 * @param {*} req
 * @param {*} res
 */
module.exports.logout = async (req, res) => {
    //on attribue un cookie vide qui va vivre 1ms, puis rediriger l'utilisateur
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/api/post");
};
