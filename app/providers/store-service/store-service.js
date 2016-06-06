import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {StoreModel} from '../../models/store-model';


@Injectable()
export class StoreService {
    static get parameters(){
        return [[Http]]
    }

    constructor(http) {
        this.http = http;
    }

    getStore(storeId) {
        return this.http.get('//' + ToteConfig.toteApiURL + '/stores/' + storeId)
            .map(res => res.json())
            .map(data => data['data'])
            .map(store => {
                if (store.constructor === Array) {
                    store = {};
                }
                return new StoreModel(store);
            })
    }

    charge(token, addresses, store) {
        let body = JSON.stringify({
            'token': token,
            'addresses': addresses,
            'basket': store.getBasket(),
            'storeId': store.id
        });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('//' + this.tote_api_url + '/charges/', body, options)
            .map(res => res.json())
    }
}

