import {
  ChakraProvider,
  theme,
  Text,
  Box,
  Grid,
  GridItem,
  Tag,
  Image,
  Table,
  Tr,
  Td,
  Tbody,
  useColorModeValue,
  Flex,
  Link,
  Button,
} from '@chakra-ui/react';

import { Icon, InlineIcon } from '@iconify/react';
import ethereumIcon from '@iconify-icons/mdi/ethereum';
import accountIcon from '@iconify-icons/mdi/account';

function ActivityCard() {
  return (
    <Flex
      borderBottom="1px"
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <Box w={50} m={5}>
        <Image
          src="https://bit.ly/sage-adebayo"
          alt="Segun Adebayo"
          borderRadius="full"
        />
      </Box>
      <Box w="100%">
        <Flex textAlign="center" alignItems="center" marginTop={7}>
          <Text as="b">Segun Adebayo </Text>
          <Text>&nbsp;started a new contest&nbsp;</Text>
          <Link>
            <Text as="b">First Stonk War</Text>
          </Link>
          <Text as="i" fontSize={'sm'} fontWeight={200}>
            &nbsp;&nbsp;2 hours ago
          </Text>
        </Flex>
        <Box
          border={1}
          borderStyle="solid"
          borderRadius={6}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          padding={4}
          marginY={3}
          marginBottom={7}
          position="relative"
          zIndex={-1}
        >
          <Box>
            <Link>
              <Text as="b">First Stonk War</Text>
            </Link>
            <Text>Sample description for a sample stonk war</Text>
            <Flex marginTop={1}>
              <Flex textAlign="center" alignItems="center" w="20%">
                <Icon icon={ethereumIcon} />
                <Text>0.1 ETH</Text>
              </Flex>
              <Flex textAlign="center" alignItems="center">
                <Icon icon={accountIcon} />
                <Text>42 Participants</Text>
              </Flex>
            </Flex>
          </Box>
          <Box position="absolute" right={7} top={7}>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'pink.400'}
              href={'#'}
              _hover={{
                bg: 'pink.300',
              }}
            >
              Submit Solution
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default ActivityCard;
