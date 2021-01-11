import { Grid } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux';

const MoviesContainer = () => {
    const movies = useSelector(state => state.movies);
    return (
        <>
        <Grid bg='#111' color='#fff'>

        </Grid>
        </>
    )
}

export default MoviesContainer;
