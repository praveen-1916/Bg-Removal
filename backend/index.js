import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
import connectToMongo from "./database.js";
import bgRemovalRouter from "./routes/bgRemovalRoute.js";
import authenticationRoute from "./routes/authenticationRoute.js";

const app = express();
const port = process.env.PORT || 3000;

connectToMongo();

//parse requests of content type - application/json
app.use(json());
//Middleware to access this server data from all origins
app.use(cors());

app.use("/image", bgRemovalRouter);
app.use("/api/user", authenticationRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
