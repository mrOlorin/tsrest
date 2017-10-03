import * as bunyan from "bunyan";
import {logConfig} from "../config/LogConfig";

export default class LogService {

    private logger: bunyan;
    private config: any;

    public constructor(config: any) {
        this.config = {
            level: config.level,
            name: config.name,
            streams: config.streams,
        };
        try {
            this.logger = bunyan.createLogger(this.config);
        } catch (e) {
            throw (new Error("LogService initialization error: " + e.message));
        }
    }

    public getLogger() {
        return this.logger;
    }

}

export const logService = new LogService(logConfig);
export const log = logService.getLogger();
