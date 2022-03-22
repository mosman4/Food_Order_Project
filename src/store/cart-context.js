import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
<<<<<<< HEAD
  addItem: (item) => {},
=======
  addItem: (id) => {},
>>>>>>> 5392b99 (Initial commit)
  removeItem: (id) => {}
});

export default CartContext;