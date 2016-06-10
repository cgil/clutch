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

        // Configure Stripe Checkout.
        var self = this;
        this.stripeHandler = StripeCheckout.configure({
            key: ToteConfig.stripePublishableKey,
            image: 'https://s3.amazonaws.com/www.totestore.com/clutch/public/assets/logo-blue.png',
            locale: 'auto',
            token: (token, addresses) => {
                let loading = self.presentLoading();
                self.storeService.charge(
                    token, addresses, self.store
                ).subscribe(
                    (data) => {
                        loading.dismiss()
                        this.goToConfirmationPage()
                    },
                    (err) => {
                        loading.dismiss()
                        self.handleError(err)
                    }
                )
            }
        });
    }

    onPageWillEnter() {
        let loading = this.presentLoading();
        this.storeService.getStore(this.storeId).subscribe(
            (store) => {
                this.store = store;
                loading.dismiss();
            },
            (err) => {
                this.handleError(err);
                loading.dismiss();
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
        let loading = Loading.create({
            content: "Please wait..."
        });
        this.nav.present(loading);
        return loading;
    }

    dismissLoading(loading) {
        loading.dismiss();
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
