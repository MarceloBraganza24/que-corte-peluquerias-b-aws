export class UserAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class PartnerAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class InvalidCredentials extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ExpiredToken extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}