import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure,
    fetchCategoriesSuccess,
    fetchCategoriesFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(
            convertCollectionsSnapshotToMap, 
            snapshot
        );
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCategoriesAsync() {
    try {
        const categoriesApiData = yield fetch("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?country=us&lang=en", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
                "x-rapidapi-key": "0e3e663af0msh5a39e9c2bfe5aecp190e1ajsn157832385380"
            }
        });

        const categoriesApiJson = yield categoriesApiData.json();

        const reduceJson = (json, categoryType) => {
            return json
                    .filter(category => category.CatName === categoryType)
                    .map(category => {
                        return category.CategoriesArray
                                .filter(subcategory => subcategory.CatName === 'Shop by Concept')[0]
                                .CategoriesArray
                                .filter(concept => concept.CatName === 'Divided')[0]
                                .CategoriesArray      
                    })[0];
        };

        const mapJsonToState = {
            guys: reduceJson(categoriesApiJson, 'Men'),
            girls: reduceJson(categoriesApiJson, 'Women')
        };

        yield put(fetchCategoriesSuccess(mapJsonToState));
    } catch (error) {
        yield put(fetchCategoriesFailure(error.message));
    }
}

export function* onFetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
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
        call(onFetchCollectionsStart),
        call(onFetchCategoriesStart)
    ]);
}