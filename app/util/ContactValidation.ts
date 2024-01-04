import IContact from "../contacts/Contact";
import { BadRequestError, InvalidInputError, MissingFieldError } from "./CustomErrors";

export default abstract class ContactValidation {
	public static Create(contact: IContact) {
		const missing = [];
		const { first_name, last_name, email, phone } = contact;

		if (Object.keys(contact).length == 0) {
			throw new BadRequestError("No body request received.");
		}
		if (!first_name) {
			missing.push("first name");
		}
		if (!last_name) {
			missing.push("last_name");
		}
		if (!email && !phone) {
			missing.push("contact info - email or phone");
		}
		if (missing.length > 0) {
			throw new MissingFieldError(missing.join(", "));
		}

		return true;
	}

	public static Update(contact: IContact) {
		const ExpectedKeys = ["first_name", "last_name", "email", "phone"];
		const Keys = Object.keys(contact);
		if (Keys.length == 0) {
			throw new BadRequestError("No body request received.");
		} else {
			Keys.forEach((Key) => {
				const Valid = ExpectedKeys.includes(Key);
				if (!Valid) throw new InvalidInputError(Key);
			});
		}
		return true;
	}
}
