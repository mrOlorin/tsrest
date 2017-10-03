import {log} from "../services/LogService";
export class Config {

    public get(path: string) {
        const segments: Array<string> = path.split(".");
        log.info(segments);
        return "";
    }

}

export let config = new Config();
