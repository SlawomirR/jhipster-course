export interface IBlog {
    id?: number;
    title?: string;
    author?: string;
    post?: any;
}

export class Blog implements IBlog {
    constructor(public id?: number, public title?: string, public author?: string, public post?: any) {}
}
