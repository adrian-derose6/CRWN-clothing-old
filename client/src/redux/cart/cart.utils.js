export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.code === cartItemToAdd.code
    );

    if (existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.code === cartItemToAdd.code
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.code === cartItemToRemove.code
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.code !== cartItemToRemove.code)
    }

    return cartItems.map(
        cartItem => 
        cartItem.code === cartItemToRemove.code ?
        { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
}