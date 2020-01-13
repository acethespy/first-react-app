import initialState from '../initialState'

export default function FormationsReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_DANCER_POSITION':
      return {
        ...state,
        formations: 'changed!',
        /*
        formations: state.formations.map((value, index) => action.id === index ? (action.x, action.y) : value)
        */
      }
    case 'UPDATE_DANCER_POSITION_TWO':
        return {
          ...state,
          formations: 'original!',
          /*
          formations: state.formations.map((value, index) => action.id === index ? (action.x, action.y) : value)
          */
        }
    default:
      return state
  }
};
