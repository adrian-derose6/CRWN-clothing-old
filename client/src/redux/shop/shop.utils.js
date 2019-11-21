export const mapFacetsToState = (facetsArray, facetsMap) => {
    const facetsState = { ...facetsMap };

    if (!facetsArray) return null;

    facetsArray.forEach(facet => {
        const { code } = facet;
        console.log(facet);

        if (code in facetsState) {
            const values = facet.values.map(item => {
                return splitCodeString(item, code);
            });

            console.log(values);

            facetsState[code] = { ...facetsState[code], values: facet.values };
        }
    })

    return facetsState;
}

export const splitCodeString = (facetObject, type) => {
    switch (type) {
        case 'sizes':
            const name = facetObject.code.match(/(?<=\_)(xxs|xs|s|m|l|xl|2xl|3xl)(.*?)(?=\_)/g);
            console.log(name);
        default:
            return facetObject;
    }
}