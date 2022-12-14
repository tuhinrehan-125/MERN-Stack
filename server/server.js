import express from "express";
import connect from "./database/mongodb.js";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import TransactionsApi from "./routes/TransactionsApi.js";
import AuthApi from "./routes/AuthApi.js";
import passportConfig from "./config/passport.js";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = 4000;
const app = express();

app.use(cors());
// parse application/json
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);

await connect();

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/transaction", TransactionsApi);
app.use("/auth", AuthApi);

app.listen(PORT, () => {
    console.log("Server is running at http://localhost:4000");
});
