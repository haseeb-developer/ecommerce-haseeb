const getInitialState = () => {
    // Check if localStorage is available (client-side only)
    if (typeof window === 'undefined' || !window.localStorage) {
        console.log('localStorage not available, using default state');
        return {
            isAuthenticated: false,
            user: null,
            cart: [],
            tempCart: [],
            wishlist: [],
            tempWishlist: []
        };
    }
    
    const storedAuth = localStorage.getItem('authState');
    console.log('Loading from localStorage:', storedAuth);
    
    if (storedAuth) {
        try {
            const parsed = JSON.parse(storedAuth);
            console.log('Parsed auth state:', parsed);
            return {
                isAuthenticated: parsed.isAuthenticated || false,
                user: parsed.user || null,
                cart: parsed.cart || [],
                tempCart: parsed.tempCart || [],
                wishlist: parsed.wishlist || [],
                tempWishlist: parsed.tempWishlist || []
            };
        } catch (error) {
            console.error('Error parsing stored auth state:', error);
        }
    }
    
    console.log('Using default initial state');
    return {
        isAuthenticated: false,
        user: null,
        cart: [],
        tempCart: [], // For non-authenticated users
        wishlist: [],
        tempWishlist: [] // For non-authenticated users
    };
};

const initialState = getInitialState();

// Helper function to save state to localStorage
const saveToLocalStorage = (state) => {
    // Check if localStorage is available (client-side only)
    if (typeof window === 'undefined' || !window.localStorage) {
        console.log('localStorage not available, skipping save');
        return;
    }
    
    try {
        localStorage.setItem('authState', JSON.stringify(state));
        console.log('Saved to localStorage:', state);
    } catch (error) {
        console.error('Error saving auth state to localStorage:', error);
    }
};

const handleAuth = (state = initialState, action) => {
    let newState;
    
    switch (action.type) {
        case "REGISTER_USER":
            newState = {
                ...state,
                isAuthenticated: false,
                user: action.payload,
                cart: [],
                tempCart: state.tempCart // Keep temp cart for login
            };
            saveToLocalStorage(newState);
            return newState;

        case "LOGIN_USER":
            // Merge temp cart with user cart if user has no existing cart
            const userCart = action.payload.cart || [];
            const mergedCart = userCart.length > 0 ? userCart : state.tempCart;
            
            // Merge temp wishlist with user wishlist if user has no existing wishlist
            const userWishlist = action.payload.wishlist || [];
            const mergedWishlist = userWishlist.length > 0 ? userWishlist : state.tempWishlist;
            
            newState = {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                cart: mergedCart,
                tempCart: [], // Clear temp cart after login
                wishlist: mergedWishlist,
                tempWishlist: [] // Clear temp wishlist after login
            };
            saveToLocalStorage(newState);
            return newState;

        case "LOGOUT_USER":
            newState = {
                ...state,
                isAuthenticated: false,
                user: null,
                cart: [],
                tempCart: [],
                wishlist: [],
                tempWishlist: []
            };
            saveToLocalStorage(newState);
            return newState;

        case "ADD_TO_CART":
            console.log('ADD_TO_CART action:', action.payload);
            console.log('Current state:', state);
            
            if (state.isAuthenticated) {
                const existingItem = state.cart.find(item => item.id === action.payload.id);
                if (existingItem) {
                    newState = {
                        ...state,
                        cart: state.cart.map(item =>
                            item.id === action.payload.id
                                ? { ...item, qty: (item.qty || 1) + 1 }
                                : item
                        )
                    };
                } else {
                    newState = {
                        ...state,
                        cart: [...state.cart, { ...action.payload, qty: 1 }]
                    };
                }
            } else {
                // For non-authenticated users, add to temp cart
                const existingItem = state.tempCart.find(item => item.id === action.payload.id);
                if (existingItem) {
                    newState = {
                        ...state,
                        tempCart: state.tempCart.map(item =>
                            item.id === action.payload.id
                                ? { ...item, qty: (item.qty || 1) + 1 }
                                : item
                        )
                    };
                } else {
                    newState = {
                        ...state,
                        tempCart: [...state.tempCart, { ...action.payload, qty: 1 }]
                    };
                }
            }
            
            console.log('New state:', newState);
            saveToLocalStorage(newState);
            return newState;

        case "REMOVE_FROM_CART":
            if (state.isAuthenticated) {
                newState = {
                    ...state,
                    cart: state.cart.filter(item => item.id !== action.payload.id)
                };
            } else {
                newState = {
                    ...state,
                    tempCart: state.tempCart.filter(item => item.id !== action.payload.id)
                };
            }
            saveToLocalStorage(newState);
            return newState;

        case "UPDATE_CART_QUANTITY":
            if (state.isAuthenticated) {
                newState = {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, qty: action.payload.qty }
                            : item
                    )
                };
            } else {
                newState = {
                    ...state,
                    tempCart: state.tempCart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, qty: action.payload.qty }
                            : item
                    )
                };
            }
            saveToLocalStorage(newState);
            return newState;

        case "CLEAR_CART":
            if (state.isAuthenticated) {
                newState = {
                    ...state,
                    cart: []
                };
            } else {
                newState = {
                    ...state,
                    tempCart: []
                };
            }
            saveToLocalStorage(newState);
            return newState;

        case "ADD_TO_WISHLIST":
            if (state.isAuthenticated) {
                const existingWishlistItem = state.wishlist.find(item => item.id === action.payload.id);
                if (!existingWishlistItem) {
                    newState = {
                        ...state,
                        wishlist: [...state.wishlist, action.payload]
                    };
                } else {
                    newState = state; // Already in wishlist
                }
            } else {
                const existingTempWishlistItem = state.tempWishlist.find(item => item.id === action.payload.id);
                if (!existingTempWishlistItem) {
                    newState = {
                        ...state,
                        tempWishlist: [...state.tempWishlist, action.payload]
                    };
                } else {
                    newState = state; // Already in temp wishlist
                }
            }
            saveToLocalStorage(newState);
            return newState;

        case "REMOVE_FROM_WISHLIST":
            if (state.isAuthenticated) {
                newState = {
                    ...state,
                    wishlist: state.wishlist.filter(item => item.id !== action.payload)
                };
            } else {
                newState = {
                    ...state,
                    tempWishlist: state.tempWishlist.filter(item => item.id !== action.payload)
                };
            }
            saveToLocalStorage(newState);
            return newState;

        case "SET_WISHLIST":
            newState = {
                ...state,
                wishlist: action.payload
            };
            saveToLocalStorage(newState);
            return newState;

        case "CLEAR_WISHLIST":
            if (state.isAuthenticated) {
                newState = {
                    ...state,
                    wishlist: []
                };
            } else {
                newState = {
                    ...state,
                    tempWishlist: []
                };
            }
            saveToLocalStorage(newState);
            return newState;

        default:
            return state;
    }
};

export default handleAuth; 