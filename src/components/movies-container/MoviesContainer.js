import { Box, Center, SimpleGrid } from '@chakra-ui/react';
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Movie from '../movie/Movie';

const MoviesContainer = () => {
  const movies = useSelector((state) => state.movies);
  const search = useSelector((state) => state.search);
  const element = useRef(null);

  useEffect(() => {
    if (element.current) {
      movies.length > 0 &&
        element.current.scrollIntoView({
          behaviour: "smooth",
        });
    }
  }, [movies]);

  return (
    <>
      {movies.length > 0 && (
        <Box bg="#FFF" ref={element}>
          {movies.length > 0 ? (
            <h2>
              <Center py={4} fontSize={{base: '1rem', md: '1.2rem', lg: '1.5rem'}}>
                Results for&nbsp;<span style={{fontWeight: 'bold', color: 'green'}}>"{search}"</span>
              </Center>
            </h2>
          ) : (
            ''
          )}
          <SimpleGrid minChildWidth={{base: '200px', md: '300px'}} p={{base: '10px', md: '15px', lg: '30px'}} spacing={{base: '10px', md: '20px', lg: '40px'}} minH="30vh">
            {movies.map((movie) => (
              <Movie movie={movie} key={movie.imdbID} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </>
  );
};

export default MoviesContainer;
