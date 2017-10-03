import {Next, Request, Response} from "../core/Action";
import {routes} from "../routes";

export default ((req: Request, res: Response, next: Next) => {
    const routeDefinition = routes[req.route.method + " " + req.route.path];
    req.route = (require("merge").recursive(true, req.route, routeDefinition));
    next();
});
