import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import IContact from "./Contact";
import { ContactRepository } from "./PrismaClient-Contact";
import ContactValidation from "../util/ContactValidation";
import { NotFoundError, NotUniqueError } from "../util/CustomErrors";

export default abstract class ContactService {
	public static async FindAll() {
		const QueryResult = await ContactRepository.findMany();
		if (QueryResult.length == 0) return null;
		else return QueryResult;
	}

	public static async FindOne(id: number) {
		try {
			const QueryResult = await ContactRepository.findUnique({ where: { id: id } });
			if (QueryResult == null) throw new NotFoundError(`${id}`);
			return QueryResult;
		} catch (error) {
			throw error;
		}
	}

	public static async CreateOne(contact: IContact) {
		try {
			ContactValidation.Create(contact);
			const QueryResult = await ContactRepository.create({ data: contact });
			return QueryResult;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code == "P2002") {
					throw new NotUniqueError(`${error.meta!.target}`);
				}
			}
			throw error;
		}
	}

	public static async DeleteOne(id: number) {
		try {
			const QueryResult = await ContactRepository.delete({ where: { id: id } });
			return QueryResult;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code == "P2025") throw new NotFoundError(`${id}`);
			}
			throw error;
		}
	}

	public static async UpdateOne(id: number, data: IContact) {
		try {
			ContactValidation.Update(data);
			const QueryResult = await ContactRepository.update({ where: { id: id }, data: data });
			return QueryResult;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code == "P2025") throw new NotFoundError(`${id}`);
			}
			throw error;
		}
	}
}
