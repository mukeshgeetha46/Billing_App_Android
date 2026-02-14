// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],           // Will store array of partners with their items
    Revieworder: []
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        AddToCart: (state, action) => {
            const { partnerId, partnerName, item } = action.payload;

            // Check if partner already exists in cart
            const existingPartnerIndex = state.cart.findIndex(
                partner => partner.partnerId === partnerId
            );

            if (existingPartnerIndex !== -1) {
                // Partner exists, check if item exists in their items
                const existingItemIndex = state.cart[existingPartnerIndex].items.findIndex(
                    cartItem => cartItem.id === item.id
                );

                if (existingItemIndex !== -1) {
                    // Item exists, update quantity
                    state.cart[existingPartnerIndex].items[existingItemIndex].quantity += item.quantity;
                } else {
                    // New item for existing partner
                    state.cart[existingPartnerIndex].items.push(item);
                }

                // Update itemCount for the partner
                state.cart[existingPartnerIndex].itemCount = state.cart[existingPartnerIndex].items.length;

                // Recalculate MOQ status if needed
                calculateMOQStatus(state.cart[existingPartnerIndex]);

            } else {
                // New partner, create new partner entry with the item
                const newPartnerCart = {
                    partnerId,
                    partnerName,
                    itemCount: 1,
                    moqStatus: 'MOQ Met', // You might want to calculate this
                    moqColor: '#3B82F6',
                    items: [item]
                };

                // Calculate initial MOQ status
                calculateMOQStatus(newPartnerCart);

                state.cart.push(newPartnerCart);
            }
        },

        UpdateQuantity: (state, action) => {
            const { partnerId, itemId, quantity } = action.payload;

            const partnerIndex = state.cart.findIndex(p => p.partnerId === partnerId);
            if (partnerIndex !== -1) {
                const itemIndex = state.cart[partnerIndex].items.findIndex(i => i.id === itemId);
                if (itemIndex !== -1) {
                    state.cart[partnerIndex].items[itemIndex].quantity = quantity;
                    calculateMOQStatus(state.cart[partnerIndex]);
                }
            }
        },

        RemoveItem: (state, action) => {
            const { partnerId, itemId } = action.payload;

            const partnerIndex = state.cart.findIndex(p => p.partnerId === partnerId);
            if (partnerIndex !== -1) {
                // Remove the item
                state.cart[partnerIndex].items = state.cart[partnerIndex].items.filter(
                    item => item.id !== itemId
                );

                // Update itemCount
                state.cart[partnerIndex].itemCount = state.cart[partnerIndex].items.length;

                // If no items left, remove the partner from cart
                if (state.cart[partnerIndex].items.length === 0) {
                    state.cart.splice(partnerIndex, 1);
                } else {
                    calculateMOQStatus(state.cart[partnerIndex]);
                }
            }
        },

        ReviewOrder: (state, action) => {
            state.cart = action.payload;
        },

        ClearCart: (state) => {
            state.cart = [];
        }
    },
});

// Helper function to calculate MOQ status
function calculateMOQStatus(partnerCart) {
    // Calculate total order value for the partner
    const totalValue = partnerCart.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    // Example MOQ threshold - you might want to make this dynamic per partner
    const MOQ_THRESHOLD = 500;

    if (totalValue >= MOQ_THRESHOLD) {
        partnerCart.moqStatus = 'MOQ Met';
        partnerCart.moqColor = '#3B82F6';
    } else {
        const shortfall = MOQ_THRESHOLD - totalValue;
        partnerCart.moqStatus = `Under MOQ ($${shortfall.toFixed(2)} short)`;
        partnerCart.moqColor = '#F59E0B';
    }
}

// Action creators
export const {
    AddToCart,
    UpdateQuantity,
    RemoveItem,
    ReviewOrder,
    ClearCart
} = orderSlice.actions;

// Selectors
export const selectCart = (state) => state.order.cart;
export const selectCartItemCount = (state) => {
    return state.order.cart.reduce((total, partner) => total + partner.itemCount, 0);
};
export const selectPartnerById = (state, partnerId) => {
    return state.order.cart.find(partner => partner.partnerId === partnerId);
};

export default orderSlice.reducer;