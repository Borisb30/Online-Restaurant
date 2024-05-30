export class ProductsModel {
    constructor(
        public id: number,
        public photoUrl: string,
        public name: string,
        public hottnes: number,
        public withNuts: boolean,
        public vegan: boolean,
        public price: number,
        public categories: string,
        public quantity?: number,
    ){ }
}