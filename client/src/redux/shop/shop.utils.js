import { FETCHABLE_FACETS } from './shop.data';

const INITIAL_FILTER = [{
    code: 'stock',
    name: 'Stock',
    facet: 'sortBy'
}];

export const addProductsList = (productsState, productsToAdd) => {
    const newState = { ...productsState };
    const { categoryCode, facets, pagination, results } = productsToAdd;

    if (!Object.keys(newState.collections).includes(categoryCode)) {
        newState.collections[categoryCode] = [];
    }
    
    results.forEach(item => {
        newState.list[item.code] = item;

        if (!Object.keys(newState.collections).includes(item.mainCategoryCode)) {
            newState.collections[item.mainCategoryCode] = [];
        }
        if (item.code && !newState.collections[categoryCode].includes(item.code)) {
            newState.collections[categoryCode].push(item.code);
        }
        if (item.code && !newState.collections[item.mainCategoryCode].includes(item.code)) {
            newState.collections[item.mainCategoryCode].push(item.code);
        }
    });

    newState.pagination[categoryCode] = pagination;

    if (!newState.facets[categoryCode]) {
        newState.facets[categoryCode] = mapFacetsToState(facets);
    }

    return newState;
}

const mapFacetsToState = (facetsArray) => {
    if (!facetsArray) return null;
    const { sortBy } = FETCHABLE_FACETS

    const fetchableFacets = reduceToFetchableFacets(facetsArray);
    const facetsWithLabeledValues = labelFacetValues(fetchableFacets)

    facetsWithLabeledValues.unshift(sortBy);

    return {
        total: facetsWithLabeledValues, 
        filters: [{
            code: 'newProduct',
            name: 'Newest',
            facet: 'sortBy'
        }]
    };
}

const reduceToFetchableFacets = (facetsArray) => {
    let fetchableFacets = facetsArray.reduce((newArray, facet) => {
        const { code } = facet;
        const fetchableFacetKeys = Object.keys(FETCHABLE_FACETS);

        if (fetchableFacetKeys.includes(code)) {
            const name = FETCHABLE_FACETS[code].name;
            newArray.push({ ...facet, name });
        }

        return newArray;
    }, []);

    return fetchableFacets;
}

const labelFacetValues = (facetsArray) => {
    let facetsWithLabeledValues = facetsArray.map(facet => {
        const { code } = facet;

        let labeledValues = facet.values.map(value => {
            const categorizedValue = { ...value, facet: code };
            const namedValue = splitCodeStringToObject(categorizedValue);
    
            return namedValue;
        });

        return { ...facet, values: labeledValues };
    });

    return facetsWithLabeledValues;
}

const splitCodeStringToObject = (facetValue) => {
    const { facet, code } = facetValue;
    let name = null;

    switch (facet) {
        case 'sizes':
            name = code.match(/(?<=\_)(xxs|xs|s|m|l|xl|2xl|3xl|4xl)(.*?)(?=\_)/g) || code.match(/(?<=\_)([0-9])(.*?)(?=\_)/g);
            const type = code.match(/(menswear|womenswear|footwear|waist)/g);

            return { 
                ...facetValue,
                name: name ? name[0] : code,
                type: type ? type[0] : null,
            };
        case 'colorWithNames':
            const hexMatch = code.match(/([a-fA-F0-9]{6})/g);
            const colorMatch = code.match(/([a-z]+)/g);
            const hexCode = (hexMatch) ? `#${hexMatch[0]}` : null;
            name = colorMatch ? colorMatch[0] : null;

            return {
                ...facetValue,
                name,
                hexCode,
            };
        default:
            return {
                ...facetValue,
                name: code
            };
    }
}

export const toggleFilter = (filters, filterToAdd) => {
    const existingFilter= filters.find(filter => JSON.stringify(filter) === JSON.stringify(filterToAdd));
    const existingSortFilter = filters.find(filter => filter.facet === 'sortBy');


    if (existingSortFilter && filterToAdd.facet === 'sortBy') {
        let removedFilter = filters.filter(filter => filter.facet !== 'sortBy'); 
        return [filterToAdd, ...removedFilter];
    }

    if (!existingFilter) {   
        return [ ...filters, filterToAdd ];
    }
    
    return filters.filter(item => JSON.stringify(item) !== JSON.stringify(filterToAdd));
};

export const generateQueryString = (filters) => {
    let str = (filters) ? filters.map((filter, index) => `${filter.facet}=${filter.code}`).join('&') : '';
    return str;
}

export const addCategories = (categoriesToAdd) => {
    const CATEGORY_VALUES = ['men', 'ladies', 'kids'];
    let nextState = {};

    categoriesToAdd.forEach(item => {
        if (CATEGORY_VALUES.includes(item.CategoryValue)) {
            nextState[item.CategoryValue] = item;
        }
    });

    return nextState;
}