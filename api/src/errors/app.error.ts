import { HttpStatus } from '@nestjs/common';

export default class AppError extends Error {
  public status: HttpStatus;

  constructor(message: string, status: HttpStatus) {
    super(message);

    this.status = status;
  }

  get name() {
    return this.constructor.name;
  }
}
