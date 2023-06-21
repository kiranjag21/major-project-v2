export const addItems = (selectedDish) => ({
  type: 'ADD_ITEMS',
  payload: selectedDish
});

export const changeQuantity = (id,quantity)=>({
type: 'CHANGE_QUANTITY',
payload : {
  id:id,
  quantity:quantity
}
});

export const removeItem = (id)=>({
type:'REMOVE_ITEM',
payload:id
});

export const clearCart =()=>({
type:'CLEAR_CART',

})
export const addUser = (id) => ({
  type: 'ADD_USER',
  payload: id
});
export const removeUser = () => ({
  type: 'REMOVE_USER'
});
export const setConnection = (con) => ({

  type: 'ADD_CONNECTION',
  payload: con
});

export const disconnect = () => ({

  type: 'DISCONNECT'
});