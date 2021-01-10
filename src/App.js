import {useState, useEffect} from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import './App.css';

function App() {
  const [searchedTerm, setSearchedTerm] = useState('');

  // const handleClick = () => {};
  return (
    <>
      <Box boxShadow="base" bg='#111'>
        <Text fontWeight="bold" py="3" color='#A20102' fontSize="2xl" textAlign="center">
          THE SHOPPIES
        </Text>
      </Box>
      <Grid 
      bg="linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.5)),url('https://i.postimg.cc/sxZ3zFYH/black-widow-min.jpg') center center no-repeat"
      bgSize='cover' placeItems="center" minH="80vh">
        <Container >
          <FormControl isRequired>
            <InputGroup size="md" >
              <Input color='#fff'placeholder="Search for movies..." value={searchedTerm} onChange={(e) => setSearchedTerm(e.target.value)}/>
              <InputRightElement>
                <IconButton icon={<SearchIcon />} />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Container>
      </Grid>
    </>
  );
}

export default App;
