export const mapFacetsToState = (facetsArray, facetsMap) => {
    const facetsState = { ...facetsMap };

    if (!facetsArray) return null;

    facetsArray.forEach(facet => {
        const { code } = facet;

        if (code in facetsState) {
            const values = facet.values.map(item => {
                return splitCodeStringToObject(item, code)
            });

            console.log(values)

            facetsState[code] = { ...facetsState[code], values: values };
        }
    })

    return facetsState;
}

export const splitCodeStringToObject = (facetObject, type) => {
    const { code } = facetObject;
    let name = null;
    switch (type) {
        case 'sizes':
            name = code.match(/(?<=\_)(xxs|xs|s|m|l|xl|2xl|3xl|4xl)(.*?)(?=\_)/g);
            const type = code.match(/(menswear|womenswear|footwear|waist)/g);
            const numberSizeArray = code.match(/(?<=\_)([0-9])(.*?)(?=\_)/g);

            return { 
                ...facetObject,
                name: name ? name[0] : null,
                type: type ? type[0] : null,
                numberSize: numberSizeArray ? numberSizeArray[0]: null
            };
        case 'colorWithNames':
            const hexMatch = code.match(/([a-fA-F0-9]{6})/g);
            const colorMatch = code.match(/([a-z]+)/g);
            const hexCode = (hexMatch) ? `#${hexMatch[0]}` : null;
            name = colorMatch ? colorMatch[0] : null;

            return {
                ...facetObject,
                name,
                hexCode
            }
        default:
            return facetObject;
    }
}