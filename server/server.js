import express from "express";
import connect from "./database/mongodb.js";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionsApi from "./routes/TransactionsApi.js";

const PORT = 4000;
const app = express();

app.use(cors());
// parse application/json
app.use(bodyParser.json());

await connect();

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/transaction", TransactionsApi);

app.listen(PORT, () => {
    console.log("Server is running at http://localhost:4000");
});
