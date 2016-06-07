export class ProductModel {
    constructor(product_data) {
        this.id = product_data.id;
        this.type = product_data.type;
        this.attributes = {};
        this.attributes.title = product_data.attributes.title;
        this.attributes.description = product_data.attributes.description;
        this.attributes.price = parseInt(product_data.attributes.price.replace('.', ''));
        this.attributes.image = product_data.attributes.image;

        // Private, not part of the product data.
        this._quantity = 0;
        this._shownPrice = this.attributes.price / 100;
    }

    addQuantity() {
        // Increase the quantity of items to purchase.
        this._quantity++;
    }

    subtractQuantity() {
        // Subtract quantity of items to purchase.
        this._quantity > 0 ? this._quantity-- : 0;
    }
}
