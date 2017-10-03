import * as path from "path";
import * as restify from "restify";
import {errors} from "../errors";
import {RoutesDefinition, StaticRoutesDefinition} from "../routes";
import {log} from "../services/LogService";
import {Next, Request, Response} from "./Action";
import {RequestDefinition} from "./RequestDefinition";
import {APIError} from "./Response";

export default class Route {

    private controllers: { [key: string]: () => void } = {};
    private controllersPath: string = path.join(__dirname, "..", "controllers");
    private methods: { [name: string]: (opts: any) => any; };
    private routes: RoutesDefinition;
    private staticRoutes: StaticRoutesDefinition = {};

    public constructor(server: restify.Server,
                       routes: RoutesDefinition,
                       staticRoutes?: StaticRoutesDefinition) {
        this.routes = routes;
        this.staticRoutes = staticRoutes;
        this.methods = {
            DELETE: server.del,
            GET: server.get,
            POST: server.post,
            PUT: server.put,
        };
        this.initRclCheck(server);
        this.initStaticRoutes(server);
        this.initRoutes(server);
    }

    private initRclCheck(server: restify.Server) {
        server.use((req: Request, res: Response, next: Next) => {
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
    }

    private getController(controllerName: string): any {
        if (!this.controllers[controllerName]) {
            try {
                const tsClass = require(path.join(this.controllersPath, controllerName));
                this.controllers[controllerName] = new tsClass.default();
            } catch (e) {
                throw new Error("Controller initialization error: " + e.message);
            }
        }
        return this.controllers[controllerName];
    }

    private initRoutes(server: restify.Server) {
        for (const route in this.routes) {
            if (!this.routes.hasOwnProperty(route)) {
                continue;
            }
            const request: RequestDefinition = new RequestDefinition(route, this.routes[route].handler);
            const jsObj = this.getController(request.controllerName);
            if (!jsObj[request.methodName]) {
                throw new Error("Wrong method specified for the route \"" + route + "\"");
            }
            let middleware;
            middleware = (req: Request, res: Response, next: Next) => {
                next();
            };
            this.methods[request.type].call(server, request.url, middleware, jsObj[request.methodName]);
            /*aclService.allow(this.routes[route].allowedRoles, request.url, request.type).then(() => {
             }, (error: any) => {
             throw new Error(error);
             });*/
        }
    }

    private initStaticRoutes(server: restify.Server) {
        const method = "GET";
        for (const route in this.staticRoutes) {
            if (!this.staticRoutes.hasOwnProperty(route)) {
                continue;
            }
            this.methods[method].call(server, route, restify.plugins.serveStatic({
                default: this.staticRoutes[route].default,
                directory: this.staticRoutes[route].directory,
            }));
            /*aclService.allow(this.staticRoutes[route].allowedRoles, route, method).then(() => {
             }, (error: any) => {
             throw new Error(error);
             });*/
        }
    }

}
