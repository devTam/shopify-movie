import { SET_MOVIES } from "./types";

export const setMovies = (movies) => ({
    type: SET_MOVIES,
    payload: movies
})