
export const SelectedDish = (state = {
  selectedDish: []
}, action) => {
// let selectedDish = state.selectedDish;
  switch (action.type) {

      case 'ADD_ITEMS':
          return { ...state, selectedDish: action.payload };

      case 'CHANGE_QUANTITY':
         console.log(state.selectedDish.dishes);
        let item = state.selectedDish.dishes.find((item) => item.dishId === action.payload.id);
        let newCart = state.selectedDish.dishes.filter((item) => item.dishId !== action.payload.id);
        item.quantity = action.payload.quantity;

        newCart.push(item);
        state.selectedDish.dishes=newCart;
        // console.log(newCart);
        return{...state,selectedDish:state.selectedDish};

         case 'REMOVE_ITEM':
           console.log("aaya");
           console.log(state.selectedDish.dishes);
           console.log(action.payload.id);
           let newCart1 = state.selectedDish.dishes.filter((item) => item.dishId !== action.payload);
            console.log(newCart1);
            state.selectedDish.dishes=newCart1;
            console.log(newCart1);
            return{...state,selectedDish:state.selectedDish};

         case 'CLEAR_CART':
          let selectedDish=[];
         return{...state,selectedDish:selectedDish};

      default:
          return state;
  }
}