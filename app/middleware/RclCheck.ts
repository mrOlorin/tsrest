import {Next, Request, Response} from "../core/Action";
import {APIError} from "../core/Response";
import {errors} from "../errors";
import {log} from "../services/LogService";

export default ((req: Request, res: Response, next: Next) => {

    if (!req.route.allowedFrom) {
        return next();
    }
    const ip = req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress;
    if (req.route.allowedFrom.indexOf(ip) === -1) {
        log.warn("Access denied for " + req.url + " from " + ip);
        const apiErrors: Array<APIError> = [];
        apiErrors.push(errors.AccessDenied);
        res.send(apiErrors);
    }
    next();
});
