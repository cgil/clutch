import {Page, NavController} from 'ionic-angular';
import {StoreService} from '../../providers/store-service/store-service';


@Page({
  templateUrl: 'build/pages/store/store.html',
})
export class StorePage {
  static get parameters() {
    return [[NavController]];
  }
    openStripe(e) {
        // Opens Stripe checkout.
        this.stripeHandler.open({
            name: 'Tote Store',
            description: 'Thank you',
            zipCode: true,
            amount: 2000,
            shippingAddress: true,
            locale: 'auto'
        });
      e.preventDefault();
    }

    constructor(nav, storeService) {
        this.nav = nav;
        this.products = storeService.loadAll();
        console.log(this.products);

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
}
