import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import React from 'react';
import FlipMove from 'react-flip-move';
import { useDispatch, useSelector } from 'react-redux';
import { decrementNomination, delNomination } from '../../redux/actions';

const NominationTab = () => {
  const nominated = useSelector((state) => state.nominated);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const itemValue = e.target.previousElementSibling.innerText;

    // Decrease notification count
    dispatch(decrementNomination());

    // Delete item
    dispatch(delNomination(itemValue));

    // Enable nominate button of deleted item
    const button = document.getElementById(itemValue);

    if (button) {
      button.disabled = false;
    }
  };
  return (
    <Box
      as="ul"
      pos="fixed"
      top={{base: '50px', md: '60px', lg: '73px'}}
      right="20px"
      zIndex={10}
      w='200px'
      bg='#121212'
      color='#fff'
      fontSize="14px"
    >
      <FlipMove>
        {nominated.map((item) => (
          <Flex
            key={item}
            boxShadow="xl"
            alignItems="center"
            borderBottom="1px"
            fontSize={{base: '.8rem', lg:'1rem'}}
            fontWeight="bold"
            py={2}
            px={3}
          >
            <li style={{ listStyle: 'none' }}>{item}</li>
            <IconButton
              size="xs"
              variant="ghost"
              ml="auto"
              border='1px'
              _hover={{color: '#121212', backgroundColor: '#fff'}}
              borderRadius={0}
              aria-label="Delete database"
              icon={<CloseIcon pointerEvents="none" />}
              onClick={handleClick}
            />
          </Flex>
        ))}
      </FlipMove>
    </Box>
  );
};

export default NominationTab;
