export class IncomingExpenses {
    constructor(
        public description: string,
        public amount: number,
        public type: string,
        public id?: string,
    ) { }
}