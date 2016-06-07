import {Page, NavController} from 'ionic-angular';
import {StoreService} from '../../providers/store-service/store-service';
import {StoreModel} from '../../models/store-model';
import {Location} from '@angular/common';
import {ConfirmationPage} from '../confirmation/confirmation';


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
            key: ToteConfig.stripePublishableKey,
            image: 'https://s3.amazonaws.com/www.totestore.com/clutch/public/assets/logo-blue.png',
            locale: 'auto',
            token: (token, addresses) => {
                self.storeService.charge(
                    token, addresses, self.store
                ).subscribe(
                    (data) => {
                        this.goToConfirmationPage()
                    },
                    (err) => {
                        self.handleError(err)
                    }
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
        // Opens Stripe checkout. If we're purchasing something.
        let amount = this.store.getTotalPriceInCents();
        if (amount > 0) {
            this.stripeHandler.open({
                name: 'Tote Store',
                description: 'Thank you',
                zipCode: true,
                amount: amount,
                shippingAddress: true,
                billingAddress: true,
                locale: 'auto'
            });
        }
    }

    goToConfirmationPage() {
        this.nav.push(ConfirmationPage);
    }

    addToBasket(product) {
        product.addQuantity();
    }

    removeFromBasket(product) {
        product.subtractQuantity();
    }
}
