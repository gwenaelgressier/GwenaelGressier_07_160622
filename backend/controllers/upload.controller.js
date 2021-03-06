const UserModel = require("../models/user.model");
const fs = require("fs");
const { uploadErrors } = require("../utils/errors.utils"); //recup detail erreur dans utils/errors.utils.js

/**
 * fonction pour modifier mon image de profil
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.uploadProfil = async (req, res) => {
    try {
        //verification du format du fichier (s'assurer que c'est une image)
        if (
            req.file.mimetype !== "image/jpg" &&
            req.file.mimetype !== "image/png" &&
            req.file.mimetype !== "image/jpeg"
        )
            throw Error("invalid file");

        if (req.file.size > 5000000) throw Error("max size"); //verif du poids du fichier
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ errors });
    }
    const images = req.file.mimetype.split("/");
    const extension = images.slice(-1).pop();
    const fileName = req.body.name + "." + extension; //nouveau nom du fichier

    //stockage de la nouvelle image.
    fs.writeFile(
        `${__dirname}/../../frontend/public/uploads/profil/${fileName}`,
        req.file.buffer,
        (err) => {
            if (err) throw err;
        }
    );

    try {
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { picture: `./uploads/profil/` + fileName } },
            { upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send({ message: err });
            }
        );
    } catch (err) {
        return;
    }
};
