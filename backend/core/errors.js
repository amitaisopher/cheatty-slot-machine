export class CustomError extends Error {
    constructor(message, statusCode) {
        super(message); // Call the parent class (Error)
        this.name = "CustomError"; // Set a custom error name
        this.statusCode = statusCode; // Add a status code (useful for HTTP errors)
    }
}
