export class ValidationError extends Error {
  public status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = "ValidationError";
    this.status = status;
  }
}

export class UnauthorizedError extends Error {
  public status: number;
  constructor(message: string, status = 401){
    super(message)
    this.name = "UnauthorizedError";
    this.status = status;
  }
}

export class NotFoundError extends Error {
  public status: number;
  constructor(message: string, status = 404){
    super(message)
    this.name = "NotFoundError";
    this.status = status;
  }
}

export class ForbiddenError extends Error {
  public status: number;
  constructor(message: string, status = 403){
    super(message)
    this.name = "ForbiddenError";
    this.status = status;
  }
}

export class DuplicateError extends Error {
  public status: number;
  constructor(message: string, status = 409) {
    super(message);
    this.name = "DuplicateError";
    this.status = status;
  }
}


