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

export const fetchCategoriesSuccess = (categories) => ({
    type: ShopActionTypes.FETCH_CATEGORIES_SUCCESS,
    payload: categories
});

export const fetchCategoriesFailure = (error) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: error
});

export const toggleFilter = (filterParams) => ({
    type: ShopActionTypes.TOGGLE_FILTER,
    payload: filterParams
});

export const fetchProductDetailsStart = (productId) => ({
    type: ShopActionTypes.FETCH_PRODUCT_DETAILS_START,
    payload: { productId }
});

export const fetchProductDetailsSuccess = (productDetailsObj) => ({
    type: ShopActionTypes.FETCH_PRODUCT_DETAILS_SUCCESS,
    payload: productDetailsObj
});

export const fetchProductDetailsFailure = (error) => ({
    type: ShopActionTypes.FETCH_PRODUCT_DETAILS_FAILURE,
    payload: error
});