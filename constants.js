const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int128", name: "answer", type: "int128" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const btcToEth = {
  from: "BTC",
  to: "ETH",
  address: "0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22",
};
const btcToUsd = {
  from: "BTC",
  to: "USD",
  address: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",
};
const ethToUsd = {
  from: "ETH",
  to: "USD",
  address: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
};
const linkToEth = {
  from: "LINK",
  to: "ETH",
  address: "0x42585eD362B3f1BCa95c640FdFf35Ef899212734",
};
const linkToUsd = {
  from: "LINK",
  to: "USD",
  address: "0xc59E3633BAAC79493d908e63626716e204A45EdF",
};
const usdcToUsd = {
  from: "USDC",
  to: "USD",
  address: "0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E",
};

// from address must be first in case multiple in list
const finalContractMapping = [
  {
    from: "LINK",
    to: "ETH",
    addresses: [linkToEth],
  },
  {
    from: "ETH",
    to: "LINK",
    addresses: [ethToUsd, linkToUsd],
  },
  {
    from: "BTC",
    to: "LINK",
    addresses: [btcToUsd, linkToUsd],
  },
  {
    from: "LINK",
    to: "BTC",
    addresses: [linkToUsd, btcToUsd],
  },
  {
    from: "BTC",
    to: "ETH",
    addresses: [btcToEth],
  },
  {
    from: "ETH",
    to: "BTC",
    addresses: [ethToUsd, btcToUsd],
  },
  {
    from: "BTC",
    to: "USDC",
    addresses: [btcToUsd, usdcToUsd],
  },
  {
    from: "USDC",
    to: "BTC",
    addresses: [usdcToUsd, btcToUsd],
  },
  {
    from: "ETH",
    to: "USDC",
    addresses: [ethToUsd, usdcToUsd],
  },
  {
    from: "USDC",
    to: "ETH",
    addresses: [usdcToUsd, ethToUsd],
  },
  {
    from: "LINK",
    to: "USDC",
    addresses: [linkToUsd, usdcToUsd],
  },
  {
    from: "USDC",
    to: "LINK",
    addresses: [usdcToUsd, linkToUsd],
  },
];
