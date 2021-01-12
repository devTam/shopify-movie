import {
  ADD_NOMINATION,
  DEC_NOMINATION,
  DEL_NOMINATION,
  INC_NOMINATION,
  SET_MOVIES,
  SET_SEARCH,
} from './types';

const INITIAL_STATE = {
  search: '',
  movies: [],
  nominationCount: 0,
  nominated: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };

    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };

    case INC_NOMINATION:
      return {
        ...state,
        nominationCount: state.nominationCount + 1,
      };

    case DEC_NOMINATION:
      return {
        ...state,
        nominationCount: state.nominationCount - 1,
      };

    case ADD_NOMINATION:
      return {
        ...state,
        nominated: [...state.nominated, action.payload],
      };

    case DEL_NOMINATION:
      return {
        ...state,
        nominated: state.nominated.filter((item) => item !== action.payload),
      };


    default:
      return state;
  }
};

export default reducer;
