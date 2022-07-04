const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    //doit être activée pour que l'appel utilise les cookies
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// jwt token
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
