export const UPDATE_DANCER_POSITION = 'UPDATE_DANCER_POSITION';
export const UPDATE_DANCER_POSITION_TWO = 'UPDATE_DANCER_POSITION_TWO';

export const updateDancerPosition = (payload) => ({
  type: UPDATE_DANCER_POSITION,
  payload
});

export const updateDancerPositionAgain = () => ({
  type: UPDATE_DANCER_POSITION_TWO
});
