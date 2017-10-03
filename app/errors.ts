import {APIError} from "./core/Response";
export const errors: any = {

    // Missing fields
    UserIdRequired: new APIError(400, 100, "User id required"),

    // Duplicates
    UserAlreadyExists: new APIError(409, 200, "User already exists"),

    // Validation
    UserIdInvalid: new APIError(400, 300, "User id invalid"),

    // Not found
    UserNotFound: new APIError(404, 400, "User not found"),

    // Access
    AccessDenied: new APIError(403, 500, "Access denied"),
    NotAuthorized: new APIError(401, 501, "Not authorized"),
    NotTheOwner: new APIError(403, 502, "Not the owner"),
    UserIsBlocked: new APIError(403, 503, "User is blocked"),

    // Internal server Error
    InternalServerError: new APIError(500, 600, "Internal server error"),
    UnknownServerError: new APIError(500, 601, "Unknown server error"),
    DatabaseError: new APIError(500, 602, "Database error"),
    MiddlewareInitializationError: new APIError(500, 603, "Middleware initialization error"),
    ControllerInitializationError: new APIError(500, 604, "Controller initialization error"),

};
