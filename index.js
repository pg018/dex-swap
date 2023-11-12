const Web3 = require("web3");
const url = "https://rpc.ankr.com/eth_sepolia";
const web3Obj = new Web3(new Web3.providers.HttpProvider(url));

// eth to BTC
// 1 BTC => 20 USD
// ? BTC => 1 USD
// 1USD => 1/20 BTC

// 1 ETH => 18 USD
// ? ETH => 1 USD
// 1USD => 1/18 ETH
// 1/18 ETH => 1/20 BTC
// 1 ETH => 18/20 BTC
// 1 BTC => 20/18 ETH

const getAddressList = (fromToken, toToken) => {
  const isExists = finalContractMapping.find(
    (item) => item.from === fromToken && item.to === toToken
  );
  if (!isExists) {
    return [];
  }
  return isExists.addresses;
};

const getPriceFeed = async (address) => {
  const priceFeed = new web3Obj.eth.Contract(aggregatorV3InterfaceABI, address);
  const roundData = await priceFeed.methods.latestRoundData().call();
  const answer = Number(roundData["answer"]);
  return +BigInt(answer).toString() / 10 ** 18;
};

const swapBtnHandler = async () => {
  document.getElementById("to_amount").value = "";
  const fromToken = document.getElementById("from_token_select").value;
  const toToken = document.getElementById("to_token_select").value;
  const fromAmount = +document.getElementById("from_amount").value;
  console.log(fromToken, toToken, fromAmount);
  if (
    fromToken === "" ||
    toToken === "" ||
    isNaN(fromAmount) ||
    fromToken === toToken
  ) {
    alert("Please Enter Valid Values");
    return;
  }
  const listItem = getAddressList(fromToken, toToken);
  console.log(listItem);
  if (listItem.length === 1) {
    const price = await getPriceFeed(listItem[0].address);
    console.log(price);
    document.getElementById("to_amount").value = price * fromAmount;
  }
  if (listItem.length === 2) {
    // first is the from to USD
    let fromToUSD = 1;
    let toToUSD = 1;
    const fromToUSDObj = listItem[0];
    const toToUSDObj = listItem[1];
    fromToUSD = await getPriceFeed(fromToUSDObj.address);
    toToUSD = await getPriceFeed(toToUSDObj.address);
    const usdToTo = 1 / toToUSD;
    const finalPrice = fromToUSD * usdToTo;
    document.getElementById("to_amount").value = finalPrice * fromAmount;
  }
};

let web3Connect = new Web3();
const isEthEnabled = async () => {
  if (window.ethereum !== "undefined") {
    web3Connect = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  return false;
};

const accountCheckButtonHandler = (account) => {
  document.getElementById("to_amount").value = "";
  document.getElementById("from_token_select").value = account.token;
  document.getElementById("from_amount").value = account.balance;
};

const createListForMetaMaskAccounts = (newAccounts) => {
  let parent = document.getElementById("account_list");
  for (const account of newAccounts) {
    let div = document.createElement("div");
    div.className = "flex flex-row justify-between items-center gap-5 p-2";
    let html = `
    <p class="font-bold text-white">${
      account.address.slice(0, 6) + "..." + account.address.slice(-4)
    }</p>
    <div class="flex flex-row items-center gap-2">
      <p class="font-bold text-white">${account.balance.toFixed(4)} ${
      account.token
    }</p>
      <button class="transition text-white hover:border-green-700 hover:bg-green-700 font-bold rounded border-solid border-2 p-1"
      >
      Check
      </button>
    </div>`;
    div.innerHTML = html;
    const button = div.querySelector("button");
    button.addEventListener("click", () => {
      accountCheckButtonHandler(account);
    });
    parent.appendChild(div);
  }
};

const metamaskConnectHandler = async () => {
  if (await !isEthEnabled()) {
    alert("Please Install MetaMask");
  }
  if (document.getElementById("login_button").innerHTML === "Connected") {
    return;
  }
  var access = await web3Connect.eth.getAccounts();
  const newAccounts = await Promise.all(
    access.map(async (address) => {
      const balance = await web3Connect.eth.getBalance(address);
      console.log(+BigInt(Number(balance)).toString() / 10 ** 18);
      return {
        address,
        balance: +BigInt(Number(balance)).toString() / 10 ** 18,
        token: "ETH",
      };
    })
  );
  createListForMetaMaskAccounts(newAccounts);
  document.getElementById("login_button").innerHTML = "Connected";
};

document.getElementById("swap_button").onclick = swapBtnHandler;
document.getElementById("login_button").onclick = metamaskConnectHandler;
