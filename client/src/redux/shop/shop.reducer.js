import ShopActionTypes from './shop.types.js';

const INITIAL_STATE = {
    collections: null,
    categories: {},
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
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            };
        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
        case ShopActionTypes.FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                isFetching: true,
                errorMessage: action.payload
            };
        case ShopActionTypes.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                categories: action.payload
            };
        default:
            return state;
    }
}

export default shopReducer;