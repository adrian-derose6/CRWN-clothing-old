import { takeLatest, call, put, all } from 'redux-saga/effects';

import {
    fetchProductsListSuccess,
    fetchProductsListFailure,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    fetchProductDetailsSuccess,
    fetchProductDetailsFailure
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
        const responseJSON = yield response.json();
        console.log(responseJSON)
        
        yield put(fetchProductsListSuccess(responseJSON));
    } catch (error) {
        yield put(fetchProductsListFailure(error.message))
    }
}

function* fetchCategoriesAsync() {
    try {
        const response = yield fetch("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?country=us&lang=en", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
                "x-rapidapi-key": "0e3e663af0msh5a39e9c2bfe5aecp190e1ajsn157832385380"
            }
        });
        const responseJSON = yield response.json();

        yield put(fetchCategoriesSuccess(responseJSON));
    } catch (error) {
        yield put(fetchCategoriesFailure(error.message));
    }
}

function* fetchProductDetailsAsync({ payload: { articleCode }}) {
    try {
        const response = yield fetch(`https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?country=us&lang=en&productcode=${articleCode}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
                "x-rapidapi-key": "0e3e663af0msh5a39e9c2bfe5aecp190e1ajsn157832385380"
            }
        });

        const responseJSON = yield response.json();

        yield put(fetchProductDetailsSuccess(responseJSON));
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

function* onFetchCategoriesStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
    );
}

function* onFetchProductDetailsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_PRODUCT_DETAILS_START,
        fetchProductDetailsAsync
    );
}

export function* shopSagas() {
    yield all([
        call(onFetchProductsListStart),
        call(onFetchCategoriesStart),
        call(onFetchProductDetailsStart)
    ]);
}