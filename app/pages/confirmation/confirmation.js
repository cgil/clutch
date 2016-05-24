import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the ConfirmationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/confirmation/confirmation.html',
})
export class ConfirmationPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
