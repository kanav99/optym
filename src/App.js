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
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import NavBar from './NavBar';
import ActivityCard from './ActivityCard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box position="sticky" top={0}>
        <NavBar />
      </Box>
      {/* <ColorModeSwitcher /> */}
      <Box>
        <Grid templateColumns="repeat(5, 1fr)" gap={3}>
          <GridItem w="100%" h={500}>
            <Box
              p={2}
              borderRight={1}
              borderStyle={'solid'}
              borderColor={useColorModeValue('gray.200', 'gray.900')}
            >
              {/* <Box p={1}>
                <Tag>Profile</Tag>
              </Box> */}
              {/* Profile Pic */}
              <Box p={1} paddingTop={4} textAlign="center">
                <Image
                  src="https://bit.ly/sage-adebayo"
                  alt="Segun Adebayo"
                  borderRadius="full"
                />
              </Box>
              {/* Information */}
              <Box>
                <Table variant="unstyled" size="md">
                  <Tbody>
                    <Tr>
                      <Td>
                        <Text as="b">Name</Text>
                      </Td>
                      <Td>Segun Adebayo</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text as="b">Balance</Text>
                      </Td>
                      <Td>420.69 ETH</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text as="b">Contests Hosted</Text>
                      </Td>
                      <Td>12</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text as="b">Solutions Submitted</Text>
                      </Td>
                      <Td>54</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            </Box>
          </GridItem>
          {/* Activity feed */}
          <GridItem w="100%" h={500} colSpan={4}>
            <Box p={2}>
              <Text>Activity Feed</Text>
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
