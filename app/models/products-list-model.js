export class ProductsListModel {

    constructor(products) {
        this.products = products;
    }

    getTotalPriceInCents() {
        let total = 0;
        this.products.forEach(product => {
            total += product.attributes.price * product._quantity;
        });
        return total;
    }
}
