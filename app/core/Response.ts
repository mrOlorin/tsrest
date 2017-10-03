export class APIError extends Error {
    public status: number;
    public code: number;
    public title: string;
    public meta: {};

    constructor(status: number | APIError, code?: number | {}, title?: string, meta?: {}) {
        if (typeof status === "number") {
            super(title);
            this.status = status;
            this.code = code as number;
            this.title = title;
            this.meta = meta;
        } else {
            const baseError: APIError = status as APIError;
            const error = code as APIError;
            super(error.title || baseError.title);
            this.status = error.status || baseError.status;
            this.code = error.code || baseError.code;
            this.title = error.title ||  baseError.title;
            this.meta = error.meta ||  baseError.meta;
        }
    }

}
