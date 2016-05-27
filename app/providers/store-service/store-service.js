import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ProductModel} from '../../models/product-model';

@Injectable()
export class StoreService {
    static get parameters(){
        return [[Http]]
    }

    constructor(http) {
        this.http = http;
    }

    getAllProducts() {
        return this.http.get('http://www.totestore.com/products/')
            .map(res => res.json())
            .map(data => data['data'])
            .map(products => {
                let results = [];
                if (products) {
                    products.forEach((product) => {
                        results.push(new ProductModel(product));
                    })
                }
                return results;
            })
    }
}

