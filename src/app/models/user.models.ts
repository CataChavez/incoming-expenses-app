export class User {

    static fromFirebase({ name, email, uid }: { name: string, email: string, uid: string }) {
        return new User(name, email, uid);
    }

    constructor(
        public name: string,
        public email: string,
        public uid: string,

    ) { }
}