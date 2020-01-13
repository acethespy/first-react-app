import initialState from '../initialState'

export function MetadataReducer(state = initialState, action) {
  const data = action.payload;
  switch (action.type) {
    case 'UPDATE_CURRENT_FORMATION_ID':
      return {
        ...state,
        currentFormationId: data.id,
      }
    default:
      return state
  }
};
