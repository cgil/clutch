import {Page, NavController} from 'ionic-angular';
import {StoreService} from '../../providers/store-service/store-service';
import {StoreModel} from '../../models/store-model';
import {Location} from '@angular/common';


@Page({
  templateUrl: 'build/pages/store/store.html',
})
export class StorePage {

    static get parameters() {
        return [[NavController], [StoreService], [Location]];
    }

    constructor(nav, storeService, location) {
        this.nav = nav;
        this.storeService = storeService;
        this.store = new StoreModel({});
        this.storeId = location.path().replace(/-|\//g, '');

        // Configure Stripe Checkout.
        var self = this;
        this.stripeHandler = StripeCheckout.configure({
            key: 'pk_test_SSTmhE8aocfnGsmEZrN9SEAM',
            image: 'img/logo-blue.png',
            locale: 'auto',
            token: (token, addresses) => {
                self.storeService.charge(
                    token, addresses, self.store
                ).subscribe(
                    (err) => self.handleError
                )
            }
        });
    }

    ngOnInit() {
        this.storeService.getStore(this.storeId).subscribe(
            store => { this.store = store;}
        );
    }

    handleError(err) {
        console.log(err);
    }

    openStripe() {
        // Opens Stripe checkout.
        this.stripeHandler.open({
            name: 'Tote Store',
            description: 'Thank you',
            zipCode: true,
            amount: this.store.getTotalPriceInCents(),
            shippingAddress: true,
            billingAddress: true,
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
