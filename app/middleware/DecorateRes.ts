import {Next, Request, Response} from "../core/Action";
import {APIError} from "../core/Response";
import {log} from "../services/LogService";

// Decorate res.send to be able to pass APIError as a first param
export default (req: Request, res: Response, next: Next) => {
    res.send = DecorateResponse.APIErrorHandlerDecorator(res.send);
    res.cookie = (key: string, value: any, options: any) => {
        res.setCookie(key, value, options);
    };
    req.res = res;
    next();
};

export class DecorateResponse {
    public static createResp(data: any) {
        if (data && data.errors) {
            return {errors: data.errors};
        } else {
            return data;
        }
    }

    public static APIErrorHandlerDecorator(f: () => void) {
        return function() {
            if (!(arguments[0] instanceof APIError) &&
                !(Array.isArray(arguments[0]) &&
                arguments[0][0] instanceof APIError)) {
                const resDecore = DecorateResponse.createResp(arguments[1]);
                return f.apply(this, [arguments[0], resDecore]);
            }
            let errors: Array<APIError>;
            if (!Array.isArray(arguments[0])) {
                errors = [arguments[0] as APIError];
            } else {
                errors = arguments[0] as Array<APIError>;
            }
            const errorDecor = DecorateResponse.createResp({errors});
            return f.apply(this, [errors[0].status, errorDecor]);
        };
    }

}
