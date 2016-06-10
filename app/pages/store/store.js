import {Page, NavController, Loading} from 'ionic-angular';
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

        this.loading = Loading.create({
            content: "Please wait..."
        });

        // Configure Stripe Checkout.
        let self = this;
        this.stripeHandler = StripeCheckout.configure({
            key: ToteConfig.stripePublishableKey,
            image: 'https://s3.amazonaws.com/www.totestore.com/clutch/public/assets/logo-blue.png',
            locale: 'auto',
            token: (token, addresses) => {
                self.presentLoading();
                self.storeService.charge(
                    token, addresses, self.store
                ).subscribe(
                    (data) => {
                        self.dismissLoading();
                        self.goToConfirmationPage();
                    },
                    (err) => {
                        self.dismissLoading();
                        self.handleError(err);
                    }
                )
            }
        });
    }

    onPageWillEnter() {
        this.presentLoading();
        this.storeService.getStore(this.storeId).subscribe(
            (store) => {
                this.store = store;
                this.dismissLoading();
            },
            (err) => {
                this.handleError(err);
                this.dismissLoading();
            }
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

    presentLoading() {
        this.nav.present(this.loading);
    }

    dismissLoading() {
        this.loading.dismiss();
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
