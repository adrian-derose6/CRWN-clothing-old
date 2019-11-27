export const SEARCH_ALL = {
    guys: [{CatName: 'All Guys Clothing', CategoryValue: 'all-guys', tagCodes: ['men_divided']}],
    girls: [{CatName: 'All Girls Clothing', CategoryValue: 'all-girls', tagCodes: ['ladies_divided']}]
};

export const CATEGORY_DESCRIPTIONS = {
    men_divided_tshirtandshirts: "Stock up on t-shirts and vests for easy everyday dressing. We have long-sleeves, short-sleeves, tanks and hoodies – from clean and classic basics to prints and bold colors for modern edge.",
    men_divided_jumpersandsweatshirts: "Shop for men’s hoodies and sweatshirts at CRWN. Whether you’re looking for an extra layer when you’re chilling out, or something to keep you cozy on the way to and from the gym, you’ll find a range of classic hoodies and zipped jackets in lots of colors – think everything from neutral greys to bold hues – and styles to suit your personality. Browse all our men’s sweaters and cardigans and stay warm this winter.",
    men_divided_jacketsandblazers: "Our short jackets and long coats for men look great all year long. With our fashionable selection, you’ll be kitted out for all occasions and seasons while looking stylish.",
    men_divided_bottoms: "Update your wardrobe basics with our selection of men’s pants. Great for effortless everyday dressing, choose from laidback chinos for the weekend and classic slacks in neutral shades, colors and a variety of fits. Discover more styles, including cool cargos, if you want to try something new this season.",
    men_divided_shoes: "Upgrade your style with new shoes – we have everything from quality leather shoes to sporty sneakers, laid-back canvas shoes and sandals. Opt for classic shoes or the new styles of the season.",
    men_divided_accessories: "Discover our men’s accessories and style up your everyday ensemble in an instant. Whether your look is less-is-more, or you prefer going the extra mile, our edit will provide the perfect finishing touches for all your outfits.",
    ladies_divided_tops: "Shop all CRWNS’s tops for women. From everyday staples to standout pieces, we have something to suit every occasion. Mix and match casual looks, like jersey tops and printed t-shirts, with jeans or relaxed pants.",
    ladies_divided_bottoms: "Embracing your own unique style couldn’t be easier with our stylish pants for women. Need something new for work? Look no further than our cigarette and suit pants to make a lasting impression. Keep it cool with flares, corduroy pants, leather pants, floaty culottes and patterned leggings. Browse all our ladies' pants below.",
    ladies_divided_dressesjumpsuits: "Romantic, trendy or casual – shop our full selection of ladies’ dresses here. Whether you’re on the lookout for cocktail or fitted styles, our evening dresses have got you covered. If you’ve got a big night out planned, look no further than our party dresses, including everything from shimmery sequin dresses to flattering bodycon styles. We’ve also got a number of pluz-size dresses to show off your silhouette.",
    ladies_divided_jacketsblazers: "Stay stylish and stand up to cold weather with our edit of women’s coats and jackets. In search of something lightweight? Browse our biker, suede and denim jackets for an uber-cool, relaxed look. And when it comes to those wintery days, try on our practical parkas, trench and wool coats to stay warm. Whatever your style, layer up your look with neat, oversized, long or short options.",
    ladies_divided_shoes: "Step out in style this season with our collection of shoes for women. From comfortable flats to heeled boots and standout party shoes, you’ll be prepared for any occasion with our edit. Shopping for boots? Browse knee-high, ankle and pointed-toe options. Or, get your kicks from our platform sneakers that look great from day to night.",
    ladies_divided_accessories: "Accessories are the best way to update your look. Add a little edge with new styles and colors, or go for timeless pieces. You can find everything from wallets for women, to handbags, belts, hats and jewelry in this selection. Our bags for women offer all the staples, including shopper, tote, handbag and backpack styles to suit both work and play. Looking for some shade? Browse our sunglasses for women, which boast square, round and aviator shapes and instantly add a touch of chic to the rest of your look."
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