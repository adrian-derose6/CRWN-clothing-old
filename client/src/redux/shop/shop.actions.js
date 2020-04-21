import ShopActionTypes from './shop.types.js';

export const fetchProductsListStart = (queryParams = {}) => ({
    type: ShopActionTypes.FETCH_PRODUCTS_LIST_START,
    payload: queryParams
});

export const fetchProductsListSuccess = (productsMap) => ({
    type: ShopActionTypes.FETCH_PRODUCTS_LIST_SUCCESS,  
    payload: productsMap
});

export const fetchProductsListFailure = (error) => ({
    type: ShopActionTypes.FETCH_PRODUCTS_LIST_FAILURE, 
    payload: error
});

export const fetchCategoriesStart = () => ({
    type: ShopActionTypes.FETCH_CATEGORIES_START
});

export const fetchCategoriesSuccess = (categories) => ({
    type: ShopActionTypes.FETCH_CATEGORIES_SUCCESS,
    payload: categories
});

export const fetchCategoriesFailure = (error) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: error
});

export const toggleFilter= (filterParams) => ({
    type: ShopActionTypes.TOGGLE_FILTER,
    payload: filterParams
});