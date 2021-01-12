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
} from '@chakra-ui/react';
import './App.css';
import { API_CALL } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies, setSearch } from './redux/actions';
import MoviesContainer from './components/movies-container/MoviesContainer';
import NominationTab from './components/nominationTab/NominationTab';

function App() {
  const [scroll, setScroll] = useState(false);
  const [showNominationTab, setShowNominationTab] = useState(false);
  const [searchedTerm, setSearchedTerm] = useState('');
  const dispatch = useDispatch();
  const nominationCount = useSelector((state) => state.nominationCount);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = async (e) => {
    e.preventDefault();
    if (searchedTerm) {
      const data = await API_CALL(
        `http://www.omdbapi.com/?s=${searchedTerm}&type=movie&apikey=25d4ed71`
      );
      const moviesArray = data.Search;
      dispatch(setSearch(searchedTerm));
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
    //   show modal if nomination count is 5
    if (nominationCount === 5) {
      onOpen();
    }
    window.addEventListener('scroll', pageScrolled);

    return () => window.removeEventListener('scroll', pageScrolled);
  }, [nominationCount, onOpen]);

  return (
    <>
      <Box
        bg={scroll && '#111'}
        boxShadow="base"
        pos="fixed"
        w="100%"
        zIndex={5}
      >
        <Flex alignItems="center" px='20px'>
          <Text fontWeight="bold" py="3" color="#A20102" fontSize="2xl">
            THE SHOPPIES
          </Text>
          <Button
            ml="auto"
            variant="ghost"
            colorScheme='black'
            color="#A20102"
            fontSize="xl"
            onClick={() => setShowNominationTab(!showNominationTab)}
          >
            Nominations &nbsp;
            <Box as="sup" color="#fff">
              {nominationCount}
            </Box>
          </Button>
        </Flex>
      </Box>
      {showNominationTab && <NominationTab />}
      <Grid
        bg="linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.5)),url('https://i.postimg.cc/sxZ3zFYH/black-widow-min.jpg') center center no-repeat"
        bgSize="cover"
        placeItems="center"
        minH="100vh"
      >
        <Container>
          <Center><Text fontSize='2xl' mb={4} color='#fff' fontWeight='bold' style={{textAlign: 'center'}}>SEARCH AND NOMINATE YOUR FAVORITE MOVIES</Text></Center>
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
        <ModalContent >
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
