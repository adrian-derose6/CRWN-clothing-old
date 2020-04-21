import { takeLatest, call, put, all } from 'redux-saga/effects';

import {
    fetchProductsListSuccess,
    fetchProductsListFailure,
    fetchCategoriesSuccess,
    fetchCategoriesFailure
} from './shop.actions';

import { SEARCH_ALL, CATEGORY_DESCRIPTIONS } from './shop.data.js';
import ShopActionTypes from './shop.types';
import { generateQueryString } from './shop.utils';

function* fetchProductsListAsync({ payload: { tagCode, filters }}) {
    try {
        console.log(filters);
        const queryString = generateQueryString(filters);
        console.log(queryString)
        const response = yield fetch(`https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?categories=${tagCode}&${queryString}&country=us&lang=en&currentpage=0&pagesize=30`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
                "x-rapidapi-key": "0e3e663af0msh5a39e9c2bfe5aecp190e1ajsn157832385380"
            }
        });
        const responseJson = yield response.json();
        console.log(responseJson)
        
        yield put(fetchProductsListSuccess(responseJson));
    } catch (error) {
        yield put(fetchProductsListFailure(error.message))
    }
}

export function* fetchCategoriesAsync() {
    try {
        const response = yield fetch("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?country=us&lang=en", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
                "x-rapidapi-key": "0e3e663af0msh5a39e9c2bfe5aecp190e1ajsn157832385380"
            }
        });
        const responseJson = yield response.json();

        yield put(fetchCategoriesSuccess(responseJson));
    } catch (error) {
        yield put(fetchCategoriesFailure(error.message));
    }
}

function* fetchProductDetailsAsync({ payload: { productId }}) {
    try {
        const response = yield fetch(`https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?country=us&lang=en&productcode=${productId}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
                "x-rapidapi-key": "0e3e663af0msh5a39e9c2bfe5aecp190e1ajsn157832385380"
            }
        });

        const responseJson = yield response.json();

        yield put(fetchProductDetailsSuccess({ productDetails: responseJson.product, productId }))
    } catch (error) {
        yield put(fetchProductDetailsFailure(error.message));
    }
}

function* onFetchProductsListStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_PRODUCTS_LIST_START, 
        fetchProductsListAsync
    );
}

export function* onFetchCategoriesStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
    );
}

export function* shopSagas() {
    yield all([
        call(onFetchProductsListStart),
        call(onFetchCategoriesStart),
        call(onFetchProductDetailsStart)
    ]);
}