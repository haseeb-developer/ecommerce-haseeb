const initialState = {
    isAuthenticated: false,
    user: null,
    cart: [],
    tempCart: [] // For non-authenticated users
};

const handleAuth = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER_USER":
            return {
                ...state,
                isAuthenticated: false,
                user: action.payload,
                cart: [],
                tempCart: state.tempCart // Keep temp cart for login
            };

        case "LOGIN_USER":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                cart: action.payload.cart || [],
                tempCart: [] // Clear temp cart after login
            };

        case "LOGOUT_USER":
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                cart: [],
                tempCart: []
            };

        case "ADD_TO_CART":
            if (state.isAuthenticated) {
                const existingItem = state.cart.find(item => item.id === action.payload.id);
                if (existingItem) {
                    return {
                        ...state,
                        cart: state.cart.map(item =>
                            item.id === action.payload.id
                                ? { ...item, qty: (item.qty || 1) + 1 }
                                : item
                        )
                    };
                } else {
                    return {
                        ...state,
                        cart: [...state.cart, { ...action.payload, qty: 1 }]
                    };
                }
            } else {
                // For non-authenticated users, add to temp cart
                const existingItem = state.tempCart.find(item => item.id === action.payload.id);
                if (existingItem) {
                    return {
                        ...state,
                        tempCart: state.tempCart.map(item =>
                            item.id === action.payload.id
                                ? { ...item, qty: (item.qty || 1) + 1 }
                                : item
                        )
                    };
                } else {
                    return {
                        ...state,
                        tempCart: [...state.tempCart, { ...action.payload, qty: 1 }]
                    };
                }
            }

        case "REMOVE_FROM_CART":
            if (state.isAuthenticated) {
                return {
                    ...state,
                    cart: state.cart.filter(item => item.id !== action.payload.id)
                };
            } else {
                return {
                    ...state,
                    tempCart: state.tempCart.filter(item => item.id !== action.payload.id)
                };
            }

        case "UPDATE_CART_QUANTITY":
            if (state.isAuthenticated) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, qty: action.payload.qty }
                            : item
                    )
                };
            } else {
                return {
                    ...state,
                    tempCart: state.tempCart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, qty: action.payload.qty }
                            : item
                    )
                };
            }

        case "CLEAR_CART":
            if (state.isAuthenticated) {
                return {
                    ...state,
                    cart: []
                };
            } else {
                return {
                    ...state,
                    tempCart: []
                };
            }

        default:
            return state;
    }
};

export default handleAuth; 