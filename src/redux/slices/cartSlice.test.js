import cartReducer, {
  addToCart,
  clearCart,
  removeFromCart,
  selectCartItems,
} from './cartSlice';

describe('cartSlice reducer', () => {
  const initialState = {
    items: [],
  };

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  it('should add a new item to the cart', () => {
    const newItem = { id: 1, name: 'Product 1', price: 100 };
    const action = addToCart(newItem);
    const state = cartReducer(initialState, action);
    expect(state.items.length).toBe(1);
    expect(state.items[0]).toEqual({ ...newItem, quantity: 1 });
  });

  it('should increase the quantity if the item already exists in the cart', () => {
    const existingState = {
      items: [{ id: 1, name: 'Product 1', price: 100, quantity: 1 }],
    };
    const action = addToCart({ id: 1 });
    const state = cartReducer(existingState, action);
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should decrease the quantity if the item is removed and its quantity is greater than 1', () => {
    const existingState = {
      items: [{ id: 1, name: 'Product 1', price: 100, quantity: 2 }],
    };
    const action = removeFromCart({ id: 1 });
    const state = cartReducer(existingState, action);
    expect(state.items[0].quantity).toBe(1);
  });

  it('should remove the item from the cart if its quantity is 1 and removeFromCart is called', () => {
    const existingState = {
      items: [{ id: 1, name: 'Product 1', price: 100, quantity: 1 }],
    };
    const action = removeFromCart({ id: 1 });
    const state = cartReducer(existingState, action);
    expect(state.items.length).toBe(0);
  });

  it('should clear the entire cart when clearCart is called', () => {
    const existingState = {
      items: [{ id: 1, name: 'Product 1', price: 100, quantity: 1 }],
    };
    const action = clearCart();
    const state = cartReducer(existingState, action);
    expect(state.items.length).toBe(0);
  });

  it('should select cart items using the selectCartItems selector', () => {
    const state = {
      cart: {
        items: [{ id: 1, name: 'Product 1', price: 100, quantity: 1 }],
      },
    };
    expect(selectCartItems(state)).toEqual([
      { id: 1, name: 'Product 1', price: 100, quantity: 1 },
    ]);
  });
});
