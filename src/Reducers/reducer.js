const iState = {
  data: [],
};

const reducer = (state = iState, action) => {
  // console.log('reducer data :::', action);

  switch (action.type) {
    case "ADD_DATA":
      console.log("reducer :::", state, action);
      return {
        // ...state,
        // data: [...new Set([...state.data, action.payload])],
        data: [...state.data, action.payload],
      };
    case "DELETE_DATA":
      return {
        // ...state
        data: [...state.data.filter((item) => item !== action.payload)],
      };
    case "UPDATE_DATA":
      state.data[action.id] = action.payload;
      return {
        // ...state
        data: [...state.data],
      };
    default:
      return state;
  }
};

export default reducer;
