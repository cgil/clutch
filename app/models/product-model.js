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
        let _shownPrice = (this.attributes.price / 100);
        if (this.isFloat(_shownPrice)) {
            _shownPrice = _shownPrice.toFixed(2);
        }
        this._shownPrice = _shownPrice;
    }

    addQuantity() {
        // Increase the quantity of items to purchase.
        this._quantity++;
    }

    subtractQuantity() {
        // Subtract quantity of items to purchase.
        this._quantity > 0 ? this._quantity-- : 0;
    }

    isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }
}
