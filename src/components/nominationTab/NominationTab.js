import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const NominationTab = () => {
    const nominated = useSelector(state => state.nominated)
    return (
        <Box as='ul' pos='fixed' top='50px' right='20px' zIndex={10} w='250px' p={3} fontSize='14px' >
            {
                nominated.map(item => (
                    <Flex key={item} alignItems='center'
                    borderBottom='1px'
                    fontWeight='bold'
                    bg='#fff' py={2} px={3}>
                        <li>{item}</li>
                        <IconButton size='xs'
                        variant='ghost'
                        ml='auto'
                        borderRadius={0} aria-label="Delete database" icon={<CloseIcon />} />

                    </Flex>
                ))
            }
            
        </Box>
    )
}

export default NominationTab
