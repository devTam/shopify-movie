import { useState, useEffect } from 'react';
import Loader from './components/loader/Loader';
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  InputRightElement,
  Text,
  useDisclosure,
  Center,
  Heading,
} from '@chakra-ui/react';
import './App.css';
import { API_CALL } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies, setSearch } from './redux/actions';
import MoviesContainer from './components/movies-container/MoviesContainer';
import NominationTab from './components/nominationTab/NominationTab';

function App() {
  const [loading, setLoading] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [showNominationTab, setShowNominationTab] = useState(false);
  const [searchedTerm, setSearchedTerm] = useState('');
  const dispatch = useDispatch();
  const nominationCount = useSelector((state) => state.nominationCount);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (searchedTerm) {
      const data = await API_CALL(
        `https://www.omdbapi.com/?s=${searchedTerm}&type=movie&apikey=25d4ed71`
      );
      const moviesArray = data.Search;
      dispatch(setSearch(searchedTerm));
      dispatch(setMovies(moviesArray));
      setLoading(false);
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
    //   show modal if nomination count is 5
    if (nominationCount === 5) {
      onOpen();
    }
    window.addEventListener('scroll', pageScrolled);

    return () => window.removeEventListener('scroll', pageScrolled);
  }, [nominationCount, onOpen]);

  return (
    <>
      {loading && <Loader />}
      <Box
        bg={scroll && '#121212'}
        boxShadow="base"
        pos="fixed"
        w="100%"
        zIndex={5}
      >
        <Flex alignItems="center" px="20px">
          <Text
            fontWeight="bold"
            py="3"
            color="#95BF47"
            fontSize={{ base: '1rem', md: '1.5rem', lg: '2rem' }}
          >
            THE SHOPPIES
          </Text>
          <Button
            ml="auto"
            _focus={{outline: 'none'}}
            variant="link"
            _hover={{textDecoration: 'none', color: '#84aa3d'}}
            colorScheme="green"
            color="#95BF47"
            fontSize={{ base: '.9rem', md: '1rem', lg: '1.5rem' }}
            onClick={() => setShowNominationTab(!showNominationTab)}
          >
            Nominations&nbsp;
            <Box as="sup" color="#fff">
              {nominationCount}
            </Box>
          </Button>
        </Flex>
      </Box>
      {showNominationTab && <NominationTab />}
      <Grid
        bg="linear-gradient(to right, rgba(0,0,0,0.4), rgba(149,191,71,0.3)),url('https://i.postimg.cc/bN0mbdHj/project-power-min.jpg') center center no-repeat"
        bgSize="cover"
        placeItems="center"
        minH="100vh"
      >
        <Container>
          <Center>
            <Heading
              fontSize={{ base: '1.2rem', md: '1.7rem', lg: '2rem' }}
              mb={4}
              color="#fff"
              style={{ textAlign: 'center' }}
            >
              MOVIE AWARDS FOR ENTREPRENEURS
            </Heading>
          </Center>
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
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thanks for your nominations!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>You have successfully nominated 5 movies</ModalBody>
        </ModalContent>
      </Modal>
      <MoviesContainer />
    </>
  );
}

export default App;
