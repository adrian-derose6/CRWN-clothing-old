import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCategories = createSelector(
    [selectShop],
    shop => shop.categories
)

export const selectCategoriesByGender = categoryUrlParam => 
    createSelector(
        [selectCategories],
        categories => (categories ? categories[categoryUrlParam] : null)
    );

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollectionsByGender = (categoryId) => 
    createSelector(
        [selectCollections],
        collections => collections && collections[categoryId] ? collections[categoryId] : null
    );

export const selectCollection = (categoryId, collectionUrlParam) => {
    const collections = selectCollectionsByGender(categoryId);
    return createSelector(
        [collections],
        collections => collections ? collections[collectionUrlParam] : null
    );
}

export const selectFilters = (categoryId, collectionUrlParam) => {
    const collection = selectCollection(categoryId, collectionUrlParam);
    return createSelector(
        [collection],
        collection => collection ? collection.filters : null
    );
}

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
);