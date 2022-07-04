const mongoose = require("mongoose");
const paswords = process.env.DB_PASSWORDS;
const userName = process.env.DB_USER;
const db = process.env.DB_NAME;
let uri;

//sert a gerer mon projet dans ses diferente phase actuellement le projet et en developement donc nous seront dans le cas du else
if (process.env.NODE_ENV === "production") {
    uri = "http://la_vraie_url_de_mongo";
} else {
    uri = `mongodb+srv://${userName}:${paswords}@cluster0.wnm0y.mongodb.net/${db}?retryWrites=true&w=majority`;
}

//conection a la base de donnees
mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("errore conecting mongo:", err));
