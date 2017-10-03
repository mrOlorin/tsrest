import * as path from "path";
import * as restify from "restify";
import {SyncEvent} from "ts-events";
import {serverConfig} from "../config/ServerConfig";
import {errors} from "../errors";
import {routes, staticRoutes} from "../routes";
import {log} from "../services/LogService";
import middleware from "./../middlewareOrder";
import Route from "./Route";

export default class Bootstrap {

    public static evtDone: SyncEvent<boolean> = new SyncEvent<boolean>();

    public static run(server: restify.Server) {
        server.pre(restify.pre.sanitizePath());
        server.use(restify.plugins.acceptParser(server.acceptable));
        server.use(restify.plugins.authorizationParser());
        server.use(restify.plugins.queryParser());
        server.use(restify.plugins.fullResponse());
        this.initBodyParser(server);
        this.initMiddleware(server);
        const route = new Route(server, routes, staticRoutes);
        server.listen(serverConfig.port, () => {
            log.info(`INFO: ${serverConfig.name} is running at ${serverConfig.address}`);
            Bootstrap.evtDone.post(true);
        });
    }

    private static readonly middlewareOrderFile = "middlewareOrder";

    private static initMiddleware(server: restify.Server) {
        const useMiddleware = (middlewareToUse: restify.RequestHandler | Array<restify.RequestHandler>) => {
            if (Array.isArray(middlewareToUse)) {
                middlewareToUse.forEach((item) => {
                    useMiddleware(item);
                });
                return;
            }
            server.use(middlewareToUse);
        };
        const middlewareFile = path.resolve(__dirname, "..", Bootstrap.middlewareOrderFile);
        const middlewareDir = path.join(__dirname, "..", "middleware");
        let middlewareOrder: Array<string> = [];
        try {
            middlewareOrder = require(middlewareFile).default;
        } catch (e) {
            log.warn("Failed to load middleware order from " + Bootstrap.middlewareOrderFile + ".ts");
        }
        middlewareOrder.forEach((item: any) => {
            let handler: any;
            try {
                handler = require(path.join(middlewareDir, item));
                useMiddleware(handler.default);
            } catch (e) {
                e.message = errors.MiddlewareInitializationError.title + ": " + e.message;
                throw e;
            }
        });
    }

    private static initBodyParser(server: restify.Server) {
        const os = require("os");
        server.use(restify.plugins.bodyParser({
            hash: "sha1",
            keepExtensions: true,
            mapParams: false,
            multiples: true,
            uploadDir: os.tmpdir(),
        }));
    }

}
