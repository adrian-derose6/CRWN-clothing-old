import ShopActionTypes from './shop.types.js';
import { toggleFilter, addProductsList, addCategories } from './shop.utils';

const INITIAL_STATE = {
    products: {
        list: {},
        pagination: {},
        facets: {},
        collections: {}
    },
    categories: {},
    isFetching: false,
    errorMessage: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ShopActionTypes.FETCH_PRODUCTS_LIST_START:
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
            const { productId, productDetails } = action.payload;

            return { 
                ...state,
                productDetails: {
                    ...state.productDetails,
                    [productId]: productDetails
                }
            }
        }
        default:
            return state;
    }
}

export default shopReducer;