export class AccessToken {
    body: {
        token: string;
    }

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
