export class LogConfig {

    public readonly name: string = "TSRest";
    public readonly streams: any = [
        {level: "debug", type: "rotating-file", period: "1d", count: 30, path: "./logs/dev.log"},
    ];

    public constructor() {
        const PrettyStream = require("bunyan-prettystream");
        const prettyStdOut = new PrettyStream({mode: "short", useColor: true});
        prettyStdOut.pipe(process.stdout);
        this.streams.push({level: "info", stream: prettyStdOut});
    }

}
export const logConfig = new LogConfig();
