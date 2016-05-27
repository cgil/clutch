import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ProductModel} from '../../models/product-model';
import {ProductsListModel} from '../../models/products-list-model';

@Injectable()
export class StoreService {
    static get parameters(){
        return [[Http]]
    }

    constructor(http) {
        this.http = http;
    }

    getAllProducts() {
        return this.http.get('//www.totestore.com/products/')
            .map(res => res.json())
            .map(data => data['data'])
            .map(products => {
                let allProducts = [];
                if (products) {
                    products.forEach((product) => {
                        allProducts.push(new ProductModel(product));
                    })
                }
                return new ProductsListModel(allProducts);
            })
    }
}

