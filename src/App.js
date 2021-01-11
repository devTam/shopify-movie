import { useState, useEffect } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import './App.css';
import { API_CALL } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from './redux/actions';
import MoviesContainer from './components/movies-container/MoviesContainer';

function App() {
  const [scroll, setScroll] = useState(false);
  const [searchedTerm, setSearchedTerm] = useState('');
  const dispatch = useDispatch();
  const nominations = useSelector(state => state.nominations)

  const handleClick = async (e) => {
    e.preventDefault();
    if (searchedTerm) {
      const data = await API_CALL(
        `http://www.omdbapi.com/?s=${searchedTerm}&type=movie&apikey=25d4ed71`
      );
      const moviesArray = data.Search;
      dispatch(setMovies(moviesArray));
    }
  };

  // Add background color on navigation when scrolled
  const pageScrolled = () => {
    if (window.pageYOffset > 20) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', pageScrolled);

    return () => window.removeEventListener('scroll', pageScrolled);
  }, []);

  return (
    <>
      <Box bg={scroll && '#111'} boxShadow="base" pos="fixed" w="100%" zIndex={100}>
        <Container maxW="5xl">
          <Flex alignItems="center">
            <Text fontWeight="bold" py="3" color="#A20102" fontSize="2xl">
              THE SHOPPIES
            </Text>
            <Button ml="auto" variant="link" color="#A20102" fontSize="xl">
              Nominations &nbsp;
              <Box as="sup" color="#fff">
                {nominations}
              </Box>
            </Button>
          </Flex>
        </Container>
      </Box>
      <Grid
        bg="linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.5)),url('https://i.postimg.cc/sxZ3zFYH/black-widow-min.jpg') center center no-repeat"
        bgSize="cover"
        placeItems="center"
        minH="70vh"
      >
        <Container>
          <FormControl as="form">
            <InputGroup size="md">
              <Input
                color="#fff"
                placeholder="Search for movies..."
                value={searchedTerm}
                onChange={(e) => setSearchedTerm(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  icon={<SearchIcon />}
                  onClick={handleClick}
                  type="submit"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Container>
      </Grid>
      <MoviesContainer searchedTerm={searchedTerm}/>
    </>
  );
}

export default App;
