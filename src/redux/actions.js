import { ADD_NOMINATION, DEC_NOMINATION, DEL_NOMINATION, INC_NOMINATION, SET_MOVIES, SET_SEARCH } from "./types";

export const setMovies = (movies) => ({
    type: SET_MOVIES,
    payload: movies
});

export const setSearch = (search) => ({
    type: SET_SEARCH,
    payload: search
});

export const incrementNomination = () => ({
    type: INC_NOMINATION
})

export const decrementNomination = () => ({
    type: DEC_NOMINATION
})

export const addNomination = (nomination) => ({
    type: ADD_NOMINATION,
    payload: nomination
})

export const delNomination = (item) => ({
    type: DEL_NOMINATION,
    payload: item
})
