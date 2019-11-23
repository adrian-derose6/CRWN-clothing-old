import ShopActionTypes from './shop.types.js';
import { toggleFilter } from './shop.utils';

const INITIAL_STATE = {
    collections: {
        guys: null,
        girls: null
    },
    filters: [],
    categories: null,
    isFetching: false,
    errorMessage: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ShopActionTypes.FETCH_COLLECTIONS_START:
        case ShopActionTypes.FETCH_CATEGORIES_START:
            return {
                ...state,
                isFetching: true
            };
        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            let { categoryId, name, collection } = action.payload;

            return {
                ...state,
                isFetching: false,
                collections: {
                    ...state.collections,
                    [categoryId]: {
                        ...state.collections[categoryId],
                        [name]: collection
                    }
                },
                errorMessage: null
            };
        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
        case ShopActionTypes.FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            };
        case ShopActionTypes.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                categories: action.payload,
                errorMessage: null
            };
        case ShopActionTypes.TOGGLE_FILTER:
            return {
                ...state,
                filters: toggleFilter(state.filters, action.payload)
            };
        default:
            return state;
    }
}

export default shopReducer;