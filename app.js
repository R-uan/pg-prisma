import express from "express";
import { router } from "./server/routes.js";
const app = express();

app.use(express.json());
app.use("/", router);

app.listen(9000, () => {
    console.log("Port 9000");
});
