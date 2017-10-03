import * as path from "path";

const DEFAULT_ENV: string = "production";
const DEFAULT_URL: string = "localhost";
const DEFAULT_PORT: number = 1433;
const DEFAULT_NAME: string = "Typescript rest api";

export class ServerConfig {
    public readonly name: string = DEFAULT_NAME;
    public readonly url: string = DEFAULT_URL;
    public readonly port: number = DEFAULT_PORT;
    public readonly address: string = this.url + ":" + this.port;
    public readonly env: string = (process.env.NODE_ENV || DEFAULT_ENV).trim();
    public readonly rootPath: string = path.join(__dirname, "..", "..");
}

export const serverConfig = new ServerConfig();
