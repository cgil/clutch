import {Page, NavController} from 'ionic-angular';
import {StoreService} from '../../providers/store-service/store-service';
import {ProductsListModel} from '../../models/products-list-model';


@Page({
  templateUrl: 'build/pages/store/store.html',
})
export class StorePage {

    static get parameters() {
        return [[NavController], [StoreService]];
    }

    constructor(nav, storeService) {
        this.nav = nav;
        this.storeService = storeService;
        this.productsList = new ProductsListModel();

        // Configure Stripe Checkout.
        this.stripeHandler = StripeCheckout.configure({
            key: 'pk_test_SSTmhE8aocfnGsmEZrN9SEAM',
            image: 'img/logo-blue.png',
            locale: 'auto',
            token: function(token) {
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
            }
        });
    }

    ngOnInit() {
        this.storeService.getAllProducts().subscribe(
            productsList => { this.productsList = productsList}
        );
    }

    openStripe() {
        // Opens Stripe checkout.
        this.stripeHandler.open({
            name: 'Tote Store',
            description: 'Thank you',
            zipCode: true,
            amount: this.productsList.getTotalPriceInCents(),
            shippingAddress: true,
            locale: 'auto'
        });
    }

    addToBasket(product) {
        product.addQuantity();
    }

    removeFromBasket(product) {
        product.subtractQuantity();
    }
}
