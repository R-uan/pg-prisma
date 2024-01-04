class NotFoundError extends Error {
	constructor(id: string) {
		super();
		super.message = `Record not found. Id: ${id}`;
	}
}

class BadRequestError extends Error {
	constructor(message: string) {
		super();
		super.message = message;
	}
}

class InvalidInputError extends Error {
	constructor(input: string) {
		super();
		super.message = `Invalid input: ${input}`;
	}
}

class MissingFieldError extends Error {
	constructor(field: string) {
		super();
		super.message = `Missing field: ${field}`;
	}
}

class NotUniqueError extends Error {
	constructor(field: string) {
		super();
		super.message = `Unique constraint violated: ${field}`;
	}
}

export { BadRequestError, InvalidInputError, MissingFieldError, NotFoundError, NotUniqueError };
