import initialState from '../initialState'

export function FormationsReducer(state = initialState, action) {
  const data = action.payload;
  switch (action.type) {
    case 'ADD_DANCER':
      return {
          ...state,
          dancers: data.newDancers,
      }
    default:
      return state
  }
};
