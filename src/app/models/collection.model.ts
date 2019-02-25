export class Collection {
    constructor(
        public name: string,
        public description: string,
        public creation_date: Date,
        public id: string,
        public pinned: boolean,
        public privateStatus: boolean,
        public isActive: boolean
    ) {

    }
}
