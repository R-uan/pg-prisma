import { NextFunction, Request, Response } from "express";
import ContactService from "./ContactService";
import {
	NotFoundError,
	MissingFieldError,
	NotUniqueError,
	InvalidInputError,
	BadRequestError,
} from "../util/CustomErrors";

export default abstract class ContactController {
	// get mapping - get all
	public static async FindAll(req: Request, res: Response) {
		try {
			const Response = await ContactService.FindAll();
			if (Response) return res.status(200).json(Response);
			else return res.status(204).json("nothing found");
		} catch (error) {
			return res.status(500).json("Internal server error");
		}
	}

	// get mapping - get one
	public static async FindOne(req: Request, res: Response) {
		try {
			const ID = parseInt(req.params.id);
			const Response = await ContactService.FindOne(ID);
			return res.status(200).json(Response);
		} catch (error) {
			if (error instanceof NotFoundError) {
				return res.status(404).json(error.message);
			} else {
				return res.status(500).json("Internal server error.");
			}
		}
	}

	// post mapping - create one
	public static async CreateOne(req: Request, res: Response) {
		try {
			const Contact = req.body;
			const Response = await ContactService.CreateOne(Contact);
			return res.status(200).json(Response);
		} catch (error) {
			if (error instanceof MissingFieldError) {
				return res.status(400).json(error.message);
			} else if (error instanceof NotUniqueError) {
				return res.status(400).json(error.message);
			} else {
				return res.status(500).json("Internal server error");
			}
		}
	}

	// delete mapping - delete one
	public static async DeleteOne(req: Request, res: Response) {
		const ID = parseInt(req.params.id);
		try {
			const Response = await ContactService.DeleteOne(ID);
			return res.json({ Response });
		} catch (error) {
			if (error instanceof NotFoundError) {
				return res.status(404).json(error.message);
			} else {
				return res.status(500).json("Internal server error.");
			}
		}
	}

	public static async UpdateOne(req: Request, res: Response) {
		const ID = parseInt(req.params.id);
		try {
			const Data = req.body;
			const Response = await ContactService.UpdateOne(ID, Data);
			return res.status(200).json(Response);
		} catch (error) {
			if (error instanceof NotFoundError) {
				return res.status(404).json(error.message);
			} else if (error instanceof InvalidInputError) {
				return res.status(400).json(error.message);
			} else if (error instanceof BadRequestError) {
				return res.status(400).json(error.message);
			} else {
				return res.status(500).json("idk");
			}
		}
	}
}
