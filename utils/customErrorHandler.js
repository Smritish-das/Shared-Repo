class CustomErrorHandler extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class BadRequestError extends CustomErrorHandler {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class UnauthorizedError extends CustomErrorHandler {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class NotFoundError extends CustomErrorHandler {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

// Export using CommonJS
module.exports = {
  CustomErrorHandler,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
};
