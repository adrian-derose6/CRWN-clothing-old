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

export const selectCategoriesByValue = (categoryUrlParam) => 
    createSelector(
        [selectCategories],
        categories => (categories ? categories[categoryUrlParam].CategoriesArray : null)
    );

export const selectProductsListByCollection = (collectionParam) => 
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

export const selectProductDetailsByCode = (articleCode) => createSelector(
        [selectProducts],
        products => {
            return (products.detail[articleCode] ? products.detail[articleCode] : null)
        }
    );

export const selectFacetsByCollection = (collectionParam) => 
    createSelector(
        [selectProducts],
        products => (products.facets[collectionParam] ? products.facets[collectionParam] : null)
    );

export const selectPaginationByCollection = (collectionParam) => 
    createSelector(
        [selectProducts],
        products => (products.pagination[collectionParam] ? products.pagination[collectionParam] : null)
    );

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);