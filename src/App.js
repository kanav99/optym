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
  Heading,
  Thead,
  Th,
  Stack,
  IconButton,
  ButtonGroup,
  Container,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
} from '@chakra-ui/react';

import { mode } from '@chakra-ui/theme-tools';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import NavBar from './NavBar';
// import CallToActionWithAnnotation from './Hero';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Logo } from './Logo';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useRef } from 'react';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <ChakraProvider theme={theme}>
      <Box position="sticky" top={0}>
        <NavBar onPrimary={onOpen} onSecondary={executeScroll} />
      </Box>
      <Box textAlign="center">
        <Container maxW={'3xl'}>
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 16 }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}
            >
              <Text as={'span'} color={'green.400'}>
                Kanav Gupta
              </Text>{' '}
              is organizing a stonk war worth{' '}
              <Text as={'span'} color={'green.400'}>
                0.1 ETH
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              Here's the deal - find the input to the function given below which
              maximizes the output value and one with the largest output value
              wins 0.1 ETH.
            </Text>
            <Box textAlign="left">
              <SyntaxHighlighter language="javascript" style={docco}>
                {'function challenge(i)\n{\n\treturn 42 * 69;\n}'}
              </SyntaxHighlighter>
            </Box>
            <Box>
              <Box
                as="button"
                colorScheme={'green'}
                bg={'green.400'}
                d="inline!"
                p={3}
                borderRadius={'0.375rem'}
                //   rounded={'full'}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}
                onClick={onOpen}
              >
                <Text color={mode('white', 'black!')}>Submit a solution</Text>
              </Box>
            </Box>
          </Stack>
        </Container>

        {/* Leaderboard Table */}
        <Heading ref={myRef}>Leaderboard</Heading>
        <Table>
          <Thead>
            <Tr>
              <Th isNumeric>Rank</Th>
              <Th>Name</Th>
              <Th isNumeric>Input</Th>
              <Th isNumeric>Output</Th>
              <Th>Submission time</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td isNumeric>1</Td>
              <Td>Kanav Gupta</Td>
              <Td isNumeric>5</Td>
              <Td isNumeric>2898</Td>
              <Td>25 May 2021 17:40</Td>
            </Tr>
            <Tr>
              <Td isNumeric>2</Td>
              <Td>Kanav Gupta</Td>
              <Td isNumeric>5</Td>
              <Td isNumeric>2898</Td>
              <Td>25 May 2021 17:40</Td>
            </Tr>
            <Tr>
              <Td isNumeric>3</Td>
              <Td>Kanav Gupta</Td>
              <Td isNumeric>5</Td>
              <Td isNumeric>2898</Td>
              <Td>25 May 2021 17:40</Td>
            </Tr>
            <Tr>
              <Td isNumeric>4</Td>
              <Td>Kanav Gupta</Td>
              <Td isNumeric>5</Td>
              <Td isNumeric>2898</Td>
              <Td>25 May 2021 17:40</Td>
            </Tr>
            <Tr>
              <Td isNumeric>5</Td>
              <Td>Kanav Gupta</Td>
              <Td isNumeric>5</Td>
              <Td isNumeric>2898</Td>
              <Td>25 May 2021 17:40</Td>
            </Tr>
            <Tr>
              <Td isNumeric>6</Td>
              <Td>Kanav Gupta</Td>
              <Td isNumeric>5</Td>
              <Td isNumeric>2898</Td>
              <Td>25 May 2021 17:40</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        role="contentinfo"
        mx="auto"
        maxW="7xl"
        py="12"
        px={{ base: '4', md: '8' }}
      >
        <Stack>
          <Stack
            direction="row"
            spacing="4"
            align="center"
            justify="space-between"
          >
            <Logo />
            <ButtonGroup variant="ghost" color="gray.600">
              <IconButton
                as="a"
                href="#"
                aria-label="LinkedIn"
                icon={<FaLinkedin fontSize="20px" />}
              />
              <IconButton
                as="a"
                href="#"
                aria-label="GitHub"
                icon={<FaGithub fontSize="20px" />}
              />
              <IconButton
                as="a"
                href="#"
                aria-label="Twitter"
                icon={<FaTwitter fontSize="20px" />}
              />
            </ButtonGroup>
          </Stack>
          <Text fontSize="sm" alignSelf={{ base: 'center', sm: 'start' }}>
            &copy; {new Date().getFullYear()} Envelope, Inc. All rights
            reserved.
          </Text>
        </Stack>
      </Box>

      {/* Submitting modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit a solution</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Waiting for Metamask...{'\n'}</Text>
            <br />
            <Input placeholder="Enter your solution" size="md"></Input>
          </ModalBody>

          <ModalFooter>
            {/* <Button variant="ghost">Secondary Action</Button> */}
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default App;
