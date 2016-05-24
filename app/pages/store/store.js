import {Page, NavController} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/store/store.html',
})
export class StorePage {
  static get parameters() {
    return [[NavController]];
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
  }
}
