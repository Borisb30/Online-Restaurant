export class ProductsModel {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public nuts: boolean,
        public image: string,
        public vegeterian: boolean,
        public spiciness: number,
        public categoryId: string,
        public categoryName?: string
    ){ }
}

export class DropdownModel {
    constructor(
        public id: number,
        public name: string,
    ){ } 
}

export class ProductInBasketModel {
    constructor(
        
        public quantity: number,
        public price: number,
        public product: ProductsModel,
    ){ }
}

export class UpdateBasketPUT {
    constructor(
        public quantity: number,
        public price: number,
        public productId: number,
    ){ } 
}

export class AddBasketPOST {
    constructor(
        public quantity: number,
        public price: number,
        public productId: number,
    ){ } 
}

export class GetFilteredItems {
    constructor(
        public vegeterian: boolean | number,
        public nuts: boolean | number,
        public spiciness: number,
        public categoryId: number | null,
    ){ } 
}