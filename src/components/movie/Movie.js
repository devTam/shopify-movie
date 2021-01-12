import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { addNomination, incrementNomination } from '../../redux/actions';

const Movie = ({ movie }) => {
  const toast = useToast();

  const dispatch = useDispatch();
  const nominationCount = useSelector((state) => state.nominationCount);
  const nominated = useSelector((state) => state.nominated);

  const handleClick = (e) => {
    const nominatedText = e.target.previousElementSibling.innerText;

    if (nominationCount < 5) {
      // Push nominated to store if not already their
      if (!nominated.includes(nominatedText)) {
        dispatch(addNomination(nominatedText));
        // Increment nominations number
        dispatch(incrementNomination());

        // show success toast
        toast({
          title: 'Nomination successful!',
          description: 'The movie has been added to your nominations.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });

        // disable nomination button
        const button = e.target;
        button.disabled = true;
      }else {
        toast({
          title: 'An error occured',
          description: 'You have already nominated this movie',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        // disable nomination button
        const button = e.target;
        button.disabled = true;

      }
    } else {
      toast({
        title: 'An error occured',
        description: 'You have exceeded the number of nominations',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex boxShadow="xl" p={2} borderRadius='10px'>
      <Box>
        <Image
          boxSize={{base: '100px', md: '120px', lg: '150px'}}
          objectFit="cover"
          src={movie.Poster}
          alt={movie.Poster}
          fallbackSrc="https://i.postimg.cc/1tk4bCV9/no-image-min.png"
        />
      </Box>
      <Box ml={4}>
        <Text fontSize={{base: '.8rem', md: '1rem'}}>
          <span style={{fontWeight: 'bold'}}>{movie.Title}</span> | {movie.Year}
        </Text>
        <Button
          id={`${movie.Title} | ${movie.Year}`}
          color="#fff"
          fontSize={{base: '.8rem', md: '1rem'}}
          colorScheme='green'
          fontWeight="bold"
          borderRadius='0'
          mt={{base: '10px'}}
          onClick={handleClick}
        >
          Nominate
        </Button>
      </Box>
    </Flex>
  );
};

export default Movie;
