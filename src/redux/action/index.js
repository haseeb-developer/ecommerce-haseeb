// Cart Actions
export const addCart = (product) =>{
    return {
        type:"ADDITEM",
        payload:product
    }
}

export const delCart = (product) =>{
    return {
        type:"DELITEM",
        payload:product
    }
}

export const removeCart = (product) => {
    return {
        type: "REMOVEITEM",
        payload: product
    }
}

// Auth Actions
export const registerUser = (userData) => {
    return {
        type: "REGISTER_USER",
        payload: userData
    }
}

export const loginUser = (userData) => {
    return {
        type: "LOGIN_USER",
        payload: userData
    }
}

export const logoutUser = () => {
    return {
        type: "LOGOUT_USER"
    }
}

// New Cart Actions (for auth system)
export const addToCart = (product) => {
    return {
        type: "ADD_TO_CART",
        payload: product
    }
}

export const removeFromCart = (product) => {
    return {
        type: "REMOVE_FROM_CART",
        payload: product
    }
}

export const updateCartQuantity = (productId, qty) => {
    return {
        type: "UPDATE_CART_QUANTITY",
        payload: { id: productId, qty }
    }
}

export const clearCart = () => {
    return {
        type: "CLEAR_CART"
    }
}