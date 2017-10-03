import * as restify from "restify";
import {User} from "../models/User";

export interface Request extends restify.Request {
    cookies: any;
    files?: any;
    res: any;
    params: any;
    route: any;
    session?: any;
    user?: User;
    logout(): void;
    logIn(user: any, next: () => void): void;
}

export interface Response extends restify.Response {
    cookie(...params: Array<any>): void;
    setCookie(...params: Array<any>): void;
    __(phrase: string): string;
    clearCookie(name: string): void;
}

export interface Next extends restify.Next {
    (err?: any): void;
    ifError(err?: any): void;
}
