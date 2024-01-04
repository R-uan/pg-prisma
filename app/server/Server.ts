import express from "express";
import { router } from "./Routes";
import ContactController from "../contacts/ContactController";

export default async function StartServer() {
	const PORT = 3001;
	const App = express();

	App.use(express.json());
	App.use("/", router);

	App.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
}
