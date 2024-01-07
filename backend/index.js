const express = require("express");
const app = express();
const env = require("dotenv");
const { FormDataRoute } = require("./Routes/FormRoutes");
const { usersRoute } = require("./Routes/UserRoute");
env.config();
const connection = require("./Config/Db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const port = process.env.port || 8080;
const cors = require("cors");

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);
app.get('/', (req, res) => {
    res.send('welcome kryzen');
});

app.use("/users", usersRoute)

app.use("/crdential", FormDataRoute)

app.listen(port, async () => {
    try {
        await connection;
        console.log(`database connected and listening to http://localhost:${port}`);
    } catch (e) {
        console.log(e);
        console.log("App is not listening");
    }

});
