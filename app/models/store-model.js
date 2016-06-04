import {ProductModel} from './product-model';


export class StoreModel {

    constructor(store) {
        this.store = store;
        this.products = this.constructProducts();
        this.id = store.id;
    }

    constructProducts() {
        let allProducts = [];
        if (this.store.attributes) {
            this.store.attributes.products.data.forEach((product) => {
                allProducts.push(new ProductModel(product));
            })
        }
        return allProducts;
    }

    getBasket() {
        let basket = [];
        this.products.forEach(product => {
            if(product._quantity > 0) {
                basket.push(product);
            }
        });
        return basket;
    }

    getTotalPriceInCents() {
        let total = 0;
        this.products.forEach(product => {
            total += product.attributes.price * product._quantity;
        });
        return total;
    }
}
