import {Next, Request, Response} from "../core/Action";

export default ((req: Request, res: Response, next: Next) => {
    req.user = null;
    next();
});
