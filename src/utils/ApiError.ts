// src/utils/ApiError.ts (or similar)

export class ApiError extends Error {
  code: number;
  errors: any | null;

  constructor(message: string, code: number, errors: any = null) {
    super(message);
    this.code = code;
    this.errors = errors;
    // Set the prototype explicitly to ensure 'instanceof' works correctly
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}