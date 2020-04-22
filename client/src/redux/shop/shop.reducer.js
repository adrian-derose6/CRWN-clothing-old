import ShopActionTypes from './shop.types.js';
import { toggleFilter, addProductsList, addCategories } from './shop.utils';

const INITIAL_STATE = {
    products: {
        list: {},
        pagination: {},
        facets: {},
        collections: {}, 
        detail: {}
    },
    categories: {},
    isFetching: false,
    errorMessage: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ShopActionTypes.FETCH_PRODUCTS_LIST_START:
        case ShopActionTypes.FETCH_PRODUCT_DETAILS_START:
        case ShopActionTypes.FETCH_CATEGORIES_START: {
            return {
                ...state,
                isFetching: true
            };
        }
        case ShopActionTypes.FETCH_PRODUCTS_LIST_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                products: addProductsList(state.products, action.payload),
                errorMessage: null
            };
        }
        case ShopActionTypes.FETCH_PRODUCTS_LIST_FAILURE:
        case ShopActionTypes.FETCH_PRODUCT_DETAILS_FAILURE:
        case ShopActionTypes.FETCH_CATEGORIES_FAILURE: {
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            };
        }
        case ShopActionTypes.FETCH_CATEGORIES_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                categories: addCategories(action.payload),
                errorMessage: null
            };
        }
        case ShopActionTypes.FETCH_PRODUCT_DETAILS_SUCCESS: {
            const { product } = action.payload;
            const { code } = product;

            return { 
                ...state,
                products: {
                    ...state.products,
                    detail: {
                        ...state.products.detail,
                        [code]: product
                    }
                }
            }
        }
        case ShopActionTypes.TOGGLE_FILTER: {
            const { collectionParam, filter } = action.payload;
            
            return {
                ...state,
                products: {
                    ...state.products,
                    facets: {
                        ...state.products.facets,
                        [collectionParam]: {
                            ...state.products.facets[collectionParam],
                            filters: toggleFilter(state.products.facets[collectionParam].filters, filter)
                        }
                    }
                }
            }
        }
        default:
            return state;
    }
}

export default shopReducer;