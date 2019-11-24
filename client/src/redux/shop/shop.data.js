export const SEARCH_ALL = {
    guys: [{CatName: 'All Guys Clothing', CategoryValue: 'all-guys', tagCodes: ['men_divided']}],
    girls: [{CatName: 'All Girls Clothing', CategoryValue: 'all-girls', tagCodes: ['ladies_divided']}]
};


export const FACETS_MAP = {
    sortBy: {
        name: 'Sort By',
        values: [
            {
                code: 'newProduct',
                name: 'Newest',
                facet: 'sortBy'
            },
            {
                code: 'ascPrice',
                name: 'Lowest Price',
                facet: 'sortBy'
            },
            {
                code: 'descPrice',
                name: 'Highest Price',
                facet: 'sortBy'
            },
            {
                code: 'stock',
                name: 'Stock',
                facet: 'sortBy'
            }
        ]
    },
    sizes: {
        name: 'Size'
    },
    fits: {
        name: 'Fit'
    },
    descriptiveLengths: {
        name: 'Length'
    },
    colorWithNames: {
        name: 'Color'
    }
}