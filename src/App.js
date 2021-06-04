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
  Flex,
  VStack,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { loadStdlib } from '@reach-sh/stdlib';

import NavBar from './NavBar';
import { Logo } from './Logo';

import config from './config';
const stdlib = loadStdlib('ETH');

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

const loggedIn = false;

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [metaMaskAccount, setMetaMaskAccout] = useState(null);
  const [submittingValue, setSubmittingValue] = useState(0);
  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const [code, setCode] = useState(config.code);
  useEffect(() => {
    // fetch('/challenge.js')
    //   .then(resp => resp.text())
    //   .then(t => setCode(t.trim()));
    // reach.getDefaultAccount().then(acc => {
    //   setMetaMaskAccout(acc);
    // });
  });

  const playGame = () => {
    stdlib.getDefaultAccount().then(async acc => {
      const fmt = x => stdlib.formatCurrency(x, 4);
      const getBalance = async who => fmt(await stdlib.balanceOf(who));
      // setMetaMaskAccout(acc);

      var once = true;
      const Contestant = i => ({
        // Who: `Contestant ${i}`,
        // ...Common,
        submitValue: () => {
          // if (i == 0) {
          if (once) {
            const value = submittingValue;
            console.log(`Contestant ${i} submitted ${value}`);
            once = false;
            return ['Some', value];
          } else {
            return ['None', null];
          }
          // return null;
        },
        informWinner: winner => {
          if (stdlib.addressEq(winner, acc)) {
            console.log(`Contestant ${i} won!`);
          } else {
            console.log('o no');
          }
        },
        informBounty: (bountyAmt, deadline) => {
          console.log('here');
          console.log(
            `Contestant ${i} saw a bounty of ${bountyAmt} and deadline ${deadline}`
          );
        },
        // shouldSubmitValue: () => {
        //     return Math.random() < 0.1;
        // }
      });

      const backend = await import(
        /* webpackIgnore: true */
        'https://optymtech.github.io/reachci/min/build/index.main.mjs'
      );
      const ctcStr = JSON.parse(config.ctcstring);
      console.log(ctcStr);
      const ctcContestant = acc.attach(backend, ctcStr);
      console.log(ctcContestant);
      backend.Contestant(ctcContestant, Contestant(69));
      console.log('hello 2');
    });
  };

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
              is organizing an Optym contest worth <br />
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
            {/* Code */}
            <Box textAlign="left" borderRadius={5}>
              <SyntaxHighlighter language="javascript" style={docco}>
                {code}
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
        <Box p={5} m={10} borderRadius={5} borderWidth={1} textAlign="center">
          <Heading paddingBottom={5}>Leaderboard</Heading>
          <Box overflowX={{ base: 'auto' }}>
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
        </Box>

        {/* Funder Info */}
        <Flex flexWrap="wrap">
          <Box
            p={5}
            minWidth={'40%'}
            m={10}
            borderRadius={5}
            borderWidth={1}
            flexGrow={1}
          >
            <Heading py={10}>About Competition</Heading>
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
          {/* Your Submissions */}
          {/* <Box
            p={5}
            minWidth="40%"
            m={10}
            borderRadius={5}
            borderWidth={1}
            flexGrow={1}
            textAlign="center"
          >
            <Heading py={10}>Your Submissions</Heading>
            {loggedIn && (
              <>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Transaction Time</Th>
                      <Th>Input</Th>
                      <Th>Output</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>25 May 2021 17:40</Td>
                      <Td>5</Td>
                      <Td>2898</Td>
                    </Tr>
                    <Tr>
                      <Td>25 May 2021 17:40</Td>
                      <Td>5</Td>
                      <Td>2898</Td>
                    </Tr>
                    <Tr>
                      <Td>25 May 2021 17:40</Td>
                      <Td>5</Td>
                      <Td>2898</Td>
                    </Tr>
                    <Tr>
                      <Td>25 May 2021 17:40</Td>
                      <Td>5</Td>
                      <Td>2898</Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Box alignItems="center" marginTop={3}>
                  <Link>{'<<'}</Link>
                  <Link marginLeft={4}>1</Link>
                  <Link marginLeft={4}>2</Link>
                  <Link marginLeft={4}>3</Link>
                  <Link marginLeft={4}>{'>>'}</Link>
                </Box>
              </>
            )}
            {!loggedIn && (
              <VStack justify="space-between" marginBottom={5} spacing={8}>
                <Text>Log In to fetch your submissions</Text>
                <Button
                  colorScheme={'green'}
                  bg={'green.400'}
                  fontSize={'sm'}
                  fontWeight={600}
                  //   rounded={'full'}
                  _hover={{
                    bg: 'green.500',
                  }}
                >
                  Log in with Metamask
                </Button>
              </VStack>
            )}
          </Box> */}
        </Flex>
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
            <Link href="https://optym.tech">
              <Logo />
            </Link>
            <ButtonGroup variant="ghost" color="gray.600">
              <IconButton
                as="a"
                href="https://github.com/optymtech/optym"
                target="_blank"
                aria-label="GitHub"
                icon={<FaGithub fontSize="20px" />}
              />
              <IconButton
                as="a"
                href="mailto:contact@optym.tech"
                icon={<FaEnvelope fontSize="20px" />}
              ></IconButton>
            </ButtonGroup>
          </Stack>
          <Stack
            direction="row"
            spacing="4"
            align="center"
            justify="space-between"
          >
            <Text fontSize="sm" alignSelf={{ base: 'center', sm: 'start' }}>
              &copy; {new Date().getFullYear()} Optym. All rights reserved.
            </Text>
            <Link
              fontSize="sm"
              textAlign="right"
              href="https://optym.tech/new"
              target="_blank"
            >
              Want to host a similar competition?
            </Link>
          </Stack>
        </Stack>
      </Box>

      {/* Submitting modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit a solution</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Text>Waiting for Metamask...{'\n'}</Text>
            <br /> */}
            <NumberInput
              placeholder="Enter your solution"
              size="md"
              value={submittingValue}
              onChange={val => {
                console.log('hehehe ' + val);
                setSubmittingValue(val);
              }}
            >
              <NumberInputField />
            </NumberInput>
          </ModalBody>

          <ModalFooter>
            {/* <Button variant="ghost">Secondary Action</Button> */}
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                playGame();
                onClose();
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default App;
