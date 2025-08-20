// Base error class for our application
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class PdfParseError extends AppError {
  constructor(message = "Failed to parse PDF file.") {
    super(message, 500);
  }
}

export class IAServiceError extends AppError {
  constructor(message = "Failed to communicate with the AI service.") {
    super(message, 502);
  }
}