import * as restify from "restify";
import {serverConfig} from "./config/ServerConfig";
import Bootstrap from "./core/Bootstrap";
import {log} from "./services/LogService";

process.on("uncaughtException", (err: any) => {
    log.error("uncaughtException", err);
});

process.on("SIGTERM", () => {
    log.error("SIGTERM");
});

const server: restify.Server = restify.createServer({
    name: serverConfig.name,
    version: require("../package.json").version,
});

try {
    Bootstrap.run(server);
} catch (e) {
    log.error(e);
}

export default server;
