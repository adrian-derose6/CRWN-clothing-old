export const mapFacetsToState = (facetsArray, facetsMap, collectionName, categoryId) => {
    const facetsState = { ...facetsMap };

    if (!facetsArray) return null;

    facetsArray.forEach(facet => {
        const { code } = facet;

        if (code in facetsState) {
            const values = facet.values.map((item, index) => {
                return splitCodeStringToObject(item, code, collectionName, categoryId)
            });

            facetsState[code] = { ...facetsState[code], values: values };
        }
    });

    const categorizedSort = facetsState.sortBy.values.map(item => ({
        ...item,
        collection: collectionName,
        categoryId
    }));

    facetsState.sortBy.values = categorizedSort;

    return facetsState;
}

export const splitCodeStringToObject = (facetObject, facetCode, collectionName, categoryId) => {
    const { code } = facetObject;
    let name = null;
    switch (facetCode) {
        case 'sizes':
            name = code.match(/(?<=\_)(xxs|xs|s|m|l|xl|2xl|3xl|4xl)(.*?)(?=\_)/g);
            const type = code.match(/(menswear|womenswear|footwear|waist)/g);
            const numberSizeArray = code.match(/(?<=\_)([0-9])(.*?)(?=\_)/g);

            return { 
                ...facetObject,
                name: name ? name[0] : null,
                type: type ? type[0] : null,
                numberSize: numberSizeArray ? numberSizeArray[0]: null,
                facet: facetCode,
                collection: collectionName,
                categoryId
            };
        case 'colorWithNames':
            const hexMatch = code.match(/([a-fA-F0-9]{6})/g);
            const colorMatch = code.match(/([a-z]+)/g);
            const hexCode = (hexMatch) ? `#${hexMatch[0]}` : null;
            name = colorMatch ? colorMatch[0] : null;

            return {
                ...facetObject,
                name,
                hexCode,
                facet: facetCode,
                collection: collectionName,
                categoryId
            }
        default:
            return {
                ...facetObject,
                facet: facetCode,
                collection: collectionName,
                categoryId
            };
    }
}

export const toggleFilter = (filters, filterToAdd) => {
    const existingFilter = filters.find(
        filter => filter.code === filterToAdd.code && 
                  filter.categoryId === filterToAdd.categoryId && 
                  filter.collection === filterToAdd.collection
    );

    if (!existingFilter) {   
        return [ ...filters, filterToAdd ];
    }

    return filters.filter(item => JSON.stringify(item) !== JSON.stringify(filterToAdd));
};