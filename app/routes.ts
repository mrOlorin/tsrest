export interface RoutesDefinition {
    [name: string]: {
        handler: string;
        allowedRoles: Array<string>;
        allowedFrom?: Array<string>;
        captchaProtected?: boolean;
    };
}

export interface StaticRoutesDefinition {
    [name: string]: {
        directory: string;
        default: string;
        allowedRoles: Array<string>;
    };
}

export interface SoapRoutesDefinition {
    [name: string]: {
        [name: string]: {
            [name: string]: string;
        },
    };
}

export const routes: RoutesDefinition = {

    /**
     * GET /
     */
    "GET /": {
        allowedRoles: ["guest"],
        handler: "IndexController.pong",
    },

};

export const staticRoutes: StaticRoutesDefinition = {
    "/\/coverage\/.*/": {
        allowedRoles: ["guest"],
        default: "index.html",
        directory: "./static",
    },
    "/\/doc\/.*/": {
        allowedRoles: ["guest"],
        default: "index.html",
        directory: "./static",
    },

};
