import {Next, Request, Response} from "../core/Action";

export default class IndexController {

    /**
     * GET /
     * @returns: string "i'm alive"
     */
    public pong(req: Request, res: Response, next: Next) {
        res.send(200, "i'm alive");
        return next();
    }

}
