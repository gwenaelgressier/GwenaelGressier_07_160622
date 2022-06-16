const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require(`dotenv`).config({ path: `./config/.env` });
require("./config/db");
const userRoutes = require("./routes/user.routes");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/user", userRoutes);

// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
