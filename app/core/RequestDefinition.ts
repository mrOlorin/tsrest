export class RequestDefinition {
    public type: string;
    public url: string;
    public controllerName: string;
    public methodName: string;

    public constructor(route: string, handler?: string) {
        this.type = route.split(" ")[0];
        this.url = route.split(" ")[1];
        this.controllerName = handler.split(".")[0];
        this.methodName = handler.split(".")[1];
    }
}
