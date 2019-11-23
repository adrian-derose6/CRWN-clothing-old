import ShopActionTypes from './shop.types.js';

export const fetchCollectionsStart = (queryParams) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
    payload: queryParams  
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,  
    payload: collectionsMap
});

export const fetchCollectionsFailure = (error) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE, 
    payload: error
});

export const fetchCategoriesStart = () => ({
    type: ShopActionTypes.FETCH_CATEGORIES_START
});

export const fetchCategoriesSuccess = (categoriesList) => ({
    type: ShopActionTypes.FETCH_CATEGORIES_SUCCESS,
    payload: categoriesList
});

export const fetchCategoriesFailure = (error) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: error
});

export const toggleFilter = (filter) => ({
    type: ShopActionTypes.TOGGLE_FILTER,
    payload: filter
});