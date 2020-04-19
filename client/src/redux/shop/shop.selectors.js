import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectProducts = createSelector(
    [selectShop],
    shop => shop.products
);

export const selectCategories = createSelector(
    [selectShop],
    shop => shop.categories
);

export const selectCategoriesByValue = categoryUrlParam => 
    createSelector(
        [selectCategories],
        categories => (categories ? categories[categoryUrlParam].CategoriesArray : null)
    );

export const selectProductsListByCollection = collectionParam => 
    createSelector(
        [selectProducts],
        products => (products.collections[collectionParam] ? generateProductsList(products, collectionParam) : null)
    );

export const generateProductsList = (state, collectionParam) => {
    let productsList = [];

    state.collections[collectionParam].forEach((productCode, index) => {
        productsList.push(state.list[productCode]);
    });

    return productsList;
}

/* export const selectFilters = (categoryId, collectionUrlParam) => {
    const collection = selectCollection(categoryId, collectionUrlParam);
    return createSelector(
        [collection],
        collection => collection ? collection.filters : null
    );
}*/

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);