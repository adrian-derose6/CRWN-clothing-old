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
            },
            {
                code: 'ascPrice',
                name: 'Lowest Price'
            },
            {
                code: 'descPrice',
                name: 'Highest Price'
            },
            {
                code: 'stock',
                name: 'Stock'
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