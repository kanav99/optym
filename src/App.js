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
  Code,
  Link,
  TableCaption,
  Flex,
  NumberInput,
  NumberInputField,
  VStack,
} from '@chakra-ui/react';

import { useState, useRef, useEffect } from 'react';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { loadStdlib } from '@reach-sh/stdlib';

import NavBar from './NavBar';
import { Logo } from './Logo';

import config from './config';

const tokenName = config.tokenName;
const stdlib = loadStdlib(tokenName);

const isAlgo = () => tokenName === 'ALGO';

if (isAlgo()) {
  stdlib.setProviderByName('TestNet');
  stdlib.setSignStrategy('AlgoSigner');
}

/// CONSTANTS!!!
const networkName = isAlgo()
  ? 'testnet'
  : config.funderAccount.provider._network.name;

const ctcObj = JSON.parse(config.ctcstring);

const contractAddr = isAlgo() ? ctcObj.ApplicationID : ctcObj.address;
const contractBlock = isAlgo() ? ctcObj.creationRound : ctcObj.creation_block;
const funderWalletAddr = isAlgo()
  ? config.funderAccount.addr
  : config.funderAccount.provider.provider.selectedAddress;

const contractLink = isAlgo()
  ? `https://testnet.algoexplorer.io/application/${contractAddr}`
  : `https://${networkName}.etherscan.io/address/${contractAddr}`;

const funderLink = isAlgo()
  ? `https://testnet.algoexplorer.io/address/${funderWalletAddr}`
  : `https://${networkName}.etherscan.io/address/${funderWalletAddr}`;
/// CONSTANTS END!!!

function App() {
  var lol = useRef(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submittingValue, setSubmittingValue] = useState(0);
  const myRef = useRef(null);
  const [currentBlock, setCurrentBlock] = useState(0);

  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const code = config.code;
  let ended = config.deadline - currentBlock + ctcObj.creationRound < 0;
  const [submissionStage, setSubmissionStage] = useState(0);

  const playGame = () => {
    stdlib.getDefaultAccount().then(async acc => {
      const Contestant = i => ({
        // Who: `Contestant ${i}`,
        // ...Common,
        submitValue: () => {
          // if (i == 0) {
          if (lol.current) {
            const value = submittingValue;
            console.log(`Contestant ${i} submitted ${value}`);
            lol.current = false;
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
        informSucc: succ => {
          console.log('informSucc');
          lol.current = false;
        },
        // shouldSubmitValue: () => {
        //     return Math.random() < 0.1;
        // }
      });

      var host = window.location.host;
      var subdomain = host.split('.')[0];
      const backend = await import(
        /* webpackIgnore: true */
        `https://optymtech.github.io/reachci/${subdomain}/build/index.main.mjs`
      );
      console.log(ctcObj);
      const ctcContestant = acc.attach(backend, ctcObj);
      console.log(ctcContestant);
      backend.Contestant(ctcContestant, Contestant(69));
      console.log('hello 2');
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (tokenName === 'ALGO') {
        fetch(`https://${networkName}.algoexplorerapi.io/v2/status`)
          .then(response => response.json())
          .then(json => {
            // setCurrentBlock(parseInt(json.result, 16));
            setCurrentBlock(json['last-round']);
          });
      } else if (tokenName === 'ETH') {
        fetch(
          `https://${networkName}.infura.io/v3/918b3d31ca0141bb8fd76be2879394ae`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{"jsonrpc":"2.0","method":"eth_blockNumber","params": [],"id":1}',
          }
        )
          .then(response => response.json())
          .then(json => {
            setCurrentBlock(parseInt(json.result, 16));
          });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box position="sticky" top={0}>
        <NavBar
          onPrimary={onOpen}
          onSecondary={executeScroll}
          primaryDisable={ended}
        />
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
                {config.wager} {tokenName}
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              Here's the deal - find the input to the function given below which
              maximizes the output value and person who deposits the largest
              output value before {config.deadline} blocks pass on the ledger,
              wins {config.wager} {tokenName}.
            </Text>
            {!ended && (
              <Heading>
                {/* {config.deadline - currentBlock + ctcObj.creation_block} /{' '} */}
                {config.deadline - currentBlock + contractBlock} /{' '}
                {config.deadline} blocks remaining till deadline!
              </Heading>
            )}
            {ended && (
              <VStack spacing={10}>
                <Heading>Competition has ended!</Heading>
                <Button
                  colorScheme={'green'}
                  bg={'green.400'}
                  fontSize={'md'}
                  fontWeight={600}
                  //   rounded={'full'}
                  _hover={{
                    bg: 'green.500',
                  }}
                >
                  Transfer money to winner
                </Button>
              </VStack>
            )}
            {/* Code */}
            <Box textAlign="left" borderRadius={5}>
              <SyntaxHighlighter language="javascript" style={docco}>
                {code}
              </SyntaxHighlighter>
            </Box>
            {!ended && (
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
            )}
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
                Powered by <Link href="https://optym.tech">Optym</Link>
              </TableCaption>
              <Tbody>
                <Tr>
                  <Th>Funder Name</Th>
                  <Td>{config.funderName}</Td>
                </Tr>
                <Tr>
                  <Th>Network</Th>
                  <Td>{networkName}</Td>
                </Tr>
                <Tr>
                  <Th>Funder Wallet</Th>
                  <Td>
                    <Code>
                      <Link href={funderLink}>{funderWalletAddr}</Link>
                    </Code>
                  </Td>
                </Tr>
                <Tr>
                  <Th>Contract Address / Application ID</Th>
                  <Td>
                    <Code>
                      <Link href={contractLink}>{contractAddr}</Link>
                    </Code>
                  </Td>
                </Tr>
                <Tr>
                  <Th>Wager Amount</Th>
                  <Td>
                    {config.wager} {tokenName}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
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
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setSubmittingValue(0);
          setSubmissionStage(0);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit a solution</ModalHeader>
          {submissionStage !== 1 && <ModalCloseButton />}
          <ModalBody>
            {submissionStage === 0 && (
              <VStack>
                <Text width="full">Submit an input value:</Text>
                <NumberInput
                  placeholder="Enter your solution"
                  size="md"
                  value={submittingValue}
                  onChange={val => {
                    setSubmittingValue(val);
                  }}
                  width="full"
                >
                  <NumberInputField />
                </NumberInput>
              </VStack>
            )}
            {submissionStage === 1 && (
              <Text>Submitting {submittingValue} ...</Text>
            )}
            {submissionStage === 2 && (
              <Text>Successfully submitted {submittingValue}!</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                if (submissionStage === 0) {
                  lol.current = true;
                  playGame();
                  setTimeout(() => {
                    setSubmissionStage(2);
                  }, 5000);
                  setSubmissionStage(1);
                } else if (submissionStage === 2) {
                  onClose();
                  setSubmittingValue(0);
                  setSubmissionStage(0);
                }
              }}
              isDisabled={submissionStage === 1}
            >
              {submissionStage === 2 ? 'Close' : 'Submit'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default App;
