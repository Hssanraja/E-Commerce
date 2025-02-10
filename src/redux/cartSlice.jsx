import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
    try {
        const cartData = localStorage.getItem('cart');
        // Check if cartData exists and is not the string "undefined"
        if (cartData && cartData !== "undefined") {
            return JSON.parse(cartData);
        }
        return []; // Return empty array if no data exists or is "undefined"
    } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        return [];
    }
};

const saveCartToStorage = (cart) => {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error("Error saving cart to localStorage:", error);
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCartFromStorage(),
    reducers: {
        addToCart(state, action) {
            state.push(action.payload);
            saveCartToStorage(state);
        },
        deleteFromCart(state, action) {
            const updatedCart = state.filter(item => item.id !== action.payload.id);
            saveCartToStorage(updatedCart);
            return updatedCart;
        },
        clearCart() {
            saveCartToStorage([]);
            return [];
        }
    }
});

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;