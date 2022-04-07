const initialState = { token: "" };

function reducer(state = initialState, action) {
  switch (action.type) {
    case "token":
      return { ...state, token: action.payload };
    default:
      return state;
  }
}

export default reducer;
