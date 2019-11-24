import ShopActionTypes from './shop.types.js';
import { toggleFilter, addCollection } from './shop.utils';

const INITIAL_STATE = {
    collections: {
        guys: null,
        girls: null
    },
    categories: null,
    isFetching: false,
    errorMessage: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ShopActionTypes.FETCH_COLLECTIONS_START:
        case ShopActionTypes.FETCH_CATEGORIES_START: {
            return {
                ...state,
                isFetching: true
            };
        }
        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS: {
            let { categoryId, collectionName, collection } = action.payload;

            return {
                ...state,
                isFetching: false,
                collections: {
                    ...state.collections,
                    [categoryId]: {
                        ...state.collections[categoryId],
                        [collectionName]: addCollection(action.payload)
                    } 
                },
                errorMessage: null
            };
        }
        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
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
                categories: action.payload,
                errorMessage: null
            };
        }
        case ShopActionTypes.TOGGLE_FILTER: {
            const { categoryId, collectionName, item } = action.payload;
            const { filters } = state.collections[categoryId][collectionName];

            return {
                ...state,
                collections: {
                    ...state.collections,
                    [categoryId]: {
                        ...state.collections[categoryId],
                        [collectionName]: {
                            ...state.collections[categoryId][collectionName],
                            filters: toggleFilter(filters, item)
                        }
                    }
                }
            };
        }
        default:
            return state;
    }
}

export default shopReducer;