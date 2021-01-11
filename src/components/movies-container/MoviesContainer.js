import { Box, Center, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import Movie from '../movie/Movie';

const MoviesContainer = ({searchedTerm}) => {
  const movies = useSelector((state) => state.movies);
  
  return (
    <Box bg='#111' color='#fff'>
      {
        movies.length > 0 ? 
    (<h2><Center py={4} fontSize='xl'>Results for "{searchedTerm}"</Center></h2>) : ''
      }
      <SimpleGrid minChildWidth="300px" p={9} spacing="40px"  minH='30vh'>
          {
              movies.map(movie => (
                  <Movie movie={movie} key={movie.Title} /> 
              ))
          }
        
      </SimpleGrid>
    </Box>
  );
};

export default MoviesContainer;
