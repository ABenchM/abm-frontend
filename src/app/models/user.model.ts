
export class User {
    constructor(
        public username: string,
        public password: string,
        public confirmpassword: string,
        public affiliation: string,
        public email: string,
        public firstname: string,
        public lastname: string,
        public oldpassword: string,
        public locked: Boolean,

    ) {

    }
}
