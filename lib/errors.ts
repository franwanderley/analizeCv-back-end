// Base error class for our application
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

// For client-side errors (e.g., bad request)
export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

// For errors during PDF parsing
export class PdfParseError extends AppError {
  constructor(message = "Failed to parse PDF file.") {
    super(message, 500);
  }
}