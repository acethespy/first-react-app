const app = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_DANCER':
      return [
        ...state,
        {
          formations: state.formations.map((value, index) => action.id === index ? (action.x, action.y) : value)
        }
      ]
    default:
      return state
  }
}

export default app
