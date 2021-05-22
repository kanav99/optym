import {
  ChakraProvider,
  theme,
  Text,
  Box,
  Table,
  Tr,
  Td,
  Tbody,
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
  Code,
  Link,
  TableCaption,
} from '@chakra-ui/react';

import { useState, useEffect, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import NavBar from './NavBar';
import { Logo } from './Logo';

import config from './config';

function Counter(props) {
  let ending = props.ending;
  const [count, setCount] = useState(ending - ((Date.now() / 1000) | 0));

  useEffect(() => {
    const interval = setInterval(
      () => setCount(ending - ((Date.now() / 1000) | 0)),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, [ending]);

  const hours = (count / 3600) | 0;
  const rem_seconds = count % 3600;
  const minutes = (rem_seconds / 60) | 0;
  const seconds = rem_seconds % 60;
  return (
    <Heading>
      {hours}:{('0' + minutes).slice(-2)}:{('0' + seconds).slice(-2)} hrs to
      submit
    </Heading>
  );
}

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
                {config.funderName}
              </Text>{' '}
              is organizing a Optym contest worth <br />
              <Text as={'span'} color={'green.400'}>
                {config.wager} ETH
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              Here's the deal - find the input to the function given below which
              maximizes the output value and person who deposits the largest
              output value before{' '}
              {new Date(config.endingTime * 1000).toUTCString()} wins 0.1 ETH.
            </Text>
            <Counter ending={config.endingTime} />
            <Box textAlign="left" borderRadius={5}>
              <SyntaxHighlighter language="javascript" style={docco}>
                {config.challengeCode}
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
                <Text ref={myRef} color={'white'}>
                  Submit a solution
                </Text>
              </Box>
            </Box>
          </Stack>
        </Container>

        {/* Leaderboard Table */}
        <Heading paddingBottom={5}>Leaderboard</Heading>
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

        {/* Funder */}
        <Heading py={10}>About Competition</Heading>
        <Stack
          direction="row"
          spacing="4"
          align="center"
          justify="space-between"
        >
          <Box p={5} m={10} minWidth={'50%'} borderRadius={5} borderWidth={1}>
            <Table variant="simple">
              <TableCaption>
                Powered by <Link>Optym</Link>
              </TableCaption>
              <Tbody>
                <Tr>
                  <Th>Funder Name</Th>
                  <Td>{config.funderName}</Td>
                </Tr>
                <Tr>
                  <Th>Funder Wallet</Th>
                  <Td>
                    <Code>
                      <Link>{config.funderWallet}</Link>
                    </Code>
                  </Td>
                </Tr>
                <Tr>
                  <Th>Contract Address</Th>
                  <Td>
                    <Code>
                      <Link>{config.contractAddress}</Link>
                    </Code>
                  </Td>
                </Tr>
                <Tr>
                  <Th>Wager Amount</Th>
                  <Td>{config.wager} ETH</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Stack>
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
                href="https://github.com/kanav99/optym"
                target="_blank"
                aria-label="GitHub"
                icon={<FaGithub fontSize="20px" />}
              />
            </ButtonGroup>
          </Stack>
          <Text fontSize="sm" alignSelf={{ base: 'center', sm: 'start' }}>
            &copy; {new Date().getFullYear()} Optym. All rights reserved.
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
