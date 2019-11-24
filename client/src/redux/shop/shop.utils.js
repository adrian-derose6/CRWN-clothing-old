import { FACETS_MAP } from './shop.data';

export const addCollection = (payload) => {
    const { facets } = payload.collection;
    const facetsMap = mapFacetsToState(facets);

    return { ...payload.collection, filters: [], facets: facetsMap };
}

export const mapFacetsToState = (facetsArray) => {
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
    console.log(filters);
    console.log(filterToAdd);

    const existingFilter = filters.find(item => JSON.stringify(item) === JSON.stringify(filterToAdd));
    const existingSortFilter = filters.find(filter => filter.facet === 'sortBy' && filter.collection === filterToAdd.collection
                                            && filter.categoryId === filterToAdd.categoryId);

    console.log(existingSortFilter)
    if (filterToAdd.facet === 'sortBy' && existingSortFilter) {
        let removedFilter = filters.filter(filter => filter.facet !== 'sortBy'); 
        return [...removedFilter, filterToAdd ];
    }

    if (!existingFilter) {   
        return [ ...filters, filterToAdd ];
    }

    return filters.filter(item => JSON.stringify(item) !== JSON.stringify(filterToAdd));
};