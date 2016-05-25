import {Page, NavController} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/store/store.html',
})
export class StorePage {
  static get parameters() {
    return [[NavController]];
  }
    openStripe(e) {
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

    constructor(nav) {
        this.nav = nav;
        this.products = [];
        for (let i = 1; i < 4; i++) {
            this.products.push({
                id: 'uuid_' + i,
                name: 'Body Solid Dumbbells ' + i,
                description: 'Add weight to your next workout! ' + i,
                picture: '/img/product-picture-placeholder.png',
                price: i
            });
        }
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
