import { Box, Button, Flex, Image } from '@chakra-ui/react';
import React from 'react';

const Movie = ({movie}) => {

  return (
    <Flex>
      <Box>
        <Image
          boxSize="200px"
          objectFit="cover"
          src={movie.Poster}
          alt={movie.Poster}
          fallbackSrc='https://i.postimg.cc/1tk4bCV9/no-image-min.png'
        />
      </Box>
      <Box ml={4}>
          <h3>{movie.Title} | {movie.Year}</h3>
          <Button bg='#A20102' color='#000' fontWeight='bold' mt={5}>
              Nominate
          </Button>
      </Box>
    </Flex>
  );
};

export default Movie;
