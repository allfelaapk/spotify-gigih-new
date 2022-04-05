const initialState = { value: "" };

function reducer(state = initialState, action) {
  switch (action.type) {
    case "token":
      return { ...state, value: action.payload };
    default:
      return state;
  }
}

export default reducer;
