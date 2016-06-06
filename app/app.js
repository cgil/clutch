import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {StorePage} from './pages/store/store';
import {StoreService} from './providers/store-service/store-service';
import {enableProdMode} from '@angular/core';

// Set up angular 2 prod mode if in production environment.
if (ToteConfig.isProduction) {
    enableProdMode();
}


// This is a massive hack to get Stripe and Angular2 to place nice.
// http://stackoverflow.com/questions/30873548/ambiguous-close-callback-on-stripe-checkout-api-with-loading-screen
const _stringify = JSON.stringify;
JSON.stringify = function (value, ...args) {
  if (args.length) {
    return _stringify(value, ...args);
  } else {
    return _stringify(value, function (key, value) {
      if (value && key === 'zone' && value['_zoneDelegate']
          && value['_zoneDelegate']['zone'] === value) {
        return undefined;
      }
      return value;
    });
  }
};


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [StoreService],
  prodMode: ToteConfig.isProduction
})
export class ClutchApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    this.rootPage = StorePage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
