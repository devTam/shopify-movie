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
        <Box bg="#111" color="#fff" ref={element}>
          {movies.length > 0 ? (
            <h2>
              <Center py={4} fontSize="xl">
                Results for "{search}"
              </Center>
            </h2>
          ) : (
            ''
          )}
          <SimpleGrid minChildWidth="300px" p={9} spacing="40px" minH="30vh">
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
