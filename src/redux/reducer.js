import { SET_MOVIES } from './types';

const INITIAL_STATE = {
  movies: [],
  nominations: 0
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
