export class AppError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;

        /*  if (typeof Error.captureStackTrace === 'function') {
             Error.captureStackTrace(this, this.constructor);
         } */
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Not Found') {
        super(message, 404);
    }
}

export class ForbiddenError extends AppError {
    constructor(message = 'Forbidden') {
        super(message, 403);
    }
}

export class BadRequestError extends AppError {
    constructor(message = 'Bad Request') {
        super(message, 400);
    }
}
export class InternalServerError extends AppError {
    constructor(message = 'Internal Server Error') {
        super(message, 500);
    }
}