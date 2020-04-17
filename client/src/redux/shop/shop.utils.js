import { FACETS_MAP } from './shop.data';

const INITIAL_FILTER = [{
    code: 'stock',
    name: 'Stock',
    facet: 'sortBy'
}];

export const addCollection = (collectionsState, payload) => {
    const { collection, categoryId, collectionName } = payload;
    const { facets } = collection;
    console.log(collectionsState)
    const nextFilters = (typeof collectionsState[categoryId][collectionName] !== 'undefined') ? 
                            [...collectionsState[categoryId][collectionName].filters] 
                        :   [...INITIAL_FILTER];

    const facetsMap = mapFacetsToState(facets);

    return { ...collection, filters: nextFilters, facets: facetsMap };
}

const mapFacetsToState = (facetsArray) => {
    if (!facetsArray) return null;

    const filteredFacets = facetsArray.reduce((newArray, facet) => {
        const { code } = facet;
        const facetKeys = Object.keys(FACETS_MAP);

        if (facetKeys.includes(code)) {
            const name = FACETS_MAP[code].name;
            newArray.push({ ...facet, name: name });
        }

        return newArray;
    }, []);

    const facetsWithLabeledValues = filteredFacets.map(facet => {
        const newValues = labelValues(facet);

        return { ...facet, values: newValues };
    });

    const facetsMap = facetsWithLabeledValues.reduce((newObj, facet) => {
        newObj[facet.code] = { code: facet.code, name: facet.name, values: facet.values };
        return newObj;
    }, {});

    return { sortBy: FACETS_MAP.sortBy, ...facetsMap }
}

const labelValues = (facet) => {
    const { code } = facet;

    return facet.values.map(value => {
        const categorizedValue = { ...value, facet: code };
        const namedValue = splitCodeStringToObject(categorizedValue);

        return namedValue;
    });
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
    const existingFilter = filters.find(filter => JSON.stringify(filter) === JSON.stringify(filterToAdd));
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