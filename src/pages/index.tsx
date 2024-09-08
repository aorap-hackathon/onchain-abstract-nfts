import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
  writeContract,
  readContract,
  getTransactionReceipt,
  waitForTransactionReceipt,
  watchContractEvent,
} from '@wagmi/core';
import {
  useChainId,
  useAccount,
  useWatchContractEvent,
} from 'wagmi';
import { config } from '../wagmi';

const sepoliaRequestAddress = "0x696c83111a49ebb94267ecf4ddf6e220d5a80129";
const sepoliaWatchAddress = "0x0A0f4321214BB6C7811dD8a71cF587bdaF03f0A0";

const optimismSepoliaRequestAddress = "0xf6919ebb1bFdD282c4edc386bFE3Dea1a1D8AC16";
const optimismSepoliaWatchAddress = "0x0A0f4321214BB6C7811dD8a71cF587bdaF03f0A0";
const optimismSepoliaNFTAddress = "0x859712Be0B540Cd5106D7A250776bb99b53ca981";

const modelID = "11";
// estimateFee

export const requestAddress: { [key in (typeof validChainIds)[number]]: string } =
{
  11155111: sepoliaRequestAddress,            // Ethereum Sepolia
  11155420: optimismSepoliaRequestAddress,    // Optimism Sepolia
};
export const watchAddress: { [key in (typeof validChainIds)[number]]: string } =
{
  11155111: sepoliaWatchAddress,            // Ethereum Sepolia
  11155420: optimismSepoliaWatchAddress,    // Optimism Sepolia
};
export const nftAddress: { [key in (typeof validChainIds)[number]]: string } =
{
  11155111: sepoliaWatchAddress,            // Ethereum Sepolia
  11155420: optimismSepoliaNFTAddress,      // Optimism Sepolia
};


export const validChainIds = config.chains.map((chain) => chain.id);

export const promptABI = [{"inputs":[{"internalType":"contract IAIOracle","name":"_aiOracle","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"contract IAIOracle","name":"expected","type":"address"},{"internalType":"contract IAIOracle","name":"found","type":"address"}],"name":"UnauthorizedCallbackSource","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"requestId","type":"uint256"},{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"modelId","type":"uint256"},{"indexed":false,"internalType":"string","name":"prompt","type":"string"}],"name":"promptRequest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"requestId","type":"uint256"},{"indexed":false,"internalType":"string","name":"output","type":"string"},{"indexed":false,"internalType":"bytes","name":"callbackData","type":"bytes"}],"name":"promptsUpdated","type":"event"},{"inputs":[],"name":"aiOracle","outputs":[{"internalType":"contract IAIOracle","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"requestId","type":"uint256"},{"internalType":"bytes","name":"output","type":"bytes"},{"internalType":"bytes","name":"callbackData","type":"bytes"}],"name":"aiOracleCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"modelId","type":"uint256"},{"internalType":"string","name":"prompt","type":"string"}],"name":"calculateAIResult","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"callbackGasLimit","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"modelId","type":"uint256"}],"name":"estimateFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"requestId","type":"uint256"}],"name":"isFinalized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"requests","outputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"modelId","type":"uint256"},{"internalType":"bytes","name":"input","type":"bytes"},{"internalType":"bytes","name":"output","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"modelId","type":"uint256"},{"internalType":"uint64","name":"gasLimit","type":"uint64"}],"name":"setCallbackGasLimit","outputs":[],"stateMutability":"nonpayable","type":"function"}] 
export const oracleABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"uint256","name":"requestId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"modelId","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"input","type":"bytes"},{"indexed":false,"internalType":"address","name":"callbackContract","type":"address"},{"indexed":false,"internalType":"uint64","name":"gasLimit","type":"uint64"},{"indexed":false,"internalType":"bytes","name":"callbackData","type":"bytes"}],"name":"AICallbackRequest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"uint256","name":"requestId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"modelId","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"input","type":"bytes"},{"indexed":false,"internalType":"address","name":"callbackContract","type":"address"},{"indexed":false,"internalType":"uint64","name":"gasLimit","type":"uint64"},{"indexed":false,"internalType":"bytes","name":"callbackData","type":"bytes"},{"indexed":false,"internalType":"enum IAIOracle.DA","name":"inputDA","type":"uint8"},{"indexed":false,"internalType":"enum IAIOracle.DA","name":"outputDA","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"batchSize","type":"uint256"}],"name":"AICallbackRequest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"uint256","name":"requestId","type":"uint256"},{"indexed":false,"internalType":"address","name":"invoker","type":"address"},{"indexed":false,"internalType":"bytes","name":"output","type":"bytes"}],"name":"AICallbackResult","type":"event"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"addToBlacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"addToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"blacklist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"callbackFunctionSelector","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"modelId","type":"uint256"}],"name":"claimModelRevenue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"requestId","type":"uint256"},{"internalType":"bytes32","name":"outputHash","type":"bytes32"}],"name":"confirm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"modelId","type":"uint256"},{"internalType":"uint256","name":"gasLimit","type":"uint256"}],"name":"estimateFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"modelId","type":"uint256"},{"internalType":"uint256","name":"gasLimit","type":"uint256"},{"internalType":"uint256","name":"batchSize","type":"uint256"}],"name":"estimateFeeBatch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"financialAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gasPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"modelId","type":"uint256"}],"name":"getModel","outputs":[{"components":[{"internalType":"bytes32","name":"modelHash","type":"bytes32"},{"internalType":"bytes32","name":"programHash","type":"bytes32"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"receiverPercentage","type":"uint256"},{"internalType":"uint256","name":"accumulateRevenue","type":"uint256"}],"internalType":"struct AIOracle.ModelData","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"requestId","type":"uint256"}],"name":"getOutputHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"requestId","type":"uint256"},{"internalType":"bytes","name":"output","type":"bytes"}],"name":"invokeCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"requestId","type":"uint256"}],"name":"isFinalized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"modelIDs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numberOfModels","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"opml","outputs":[{"internalType":"contract IOpml","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"outputOfRequest","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"removeFromBlacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"removeFromWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"modelId","type":"uint256"}],"name":"removeModel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"batchSize","type":"uint256"},{"internalType":"uint256","name":"modelId","type":"uint256"},{"internalType":"bytes","name":"input","type":"bytes"},{"internalType":"address","name":"callbackContract","type":"address"},{"internalType":"uint64","name":"gasLimit","type":"uint64"},{"internalType":"bytes","name":"callbackData","type":"bytes"},{"internalType":"enum IAIOracle.DA","name":"inputDA","type":"uint8"},{"internalType":"enum IAIOracle.DA","name":"outputDA","type":"uint8"}],"name":"requestBatchInference","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"modelId","type":"uint256"},{"internalType":"bytes","name":"input","type":"bytes"},{"internalType":"address","name":"callbackContract","type":"address"},{"internalType":"uint64","name":"gasLimit","type":"uint64"},{"internalType":"bytes","name":"callbackData","type":"bytes"}],"name":"requestCallback","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"modelId","type":"uint256"},{"internalType":"bytes","name":"input","type":"bytes"},{"internalType":"address","name":"callbackContract","type":"address"},{"internalType":"uint64","name":"gasLimit","type":"uint64"},{"internalType":"bytes","name":"callbackData","type":"bytes"},{"internalType":"enum IAIOracle.DA","name":"inputDA","type":"uint8"},{"internalType":"enum IAIOracle.DA","name":"outputDA","type":"uint8"}],"name":"requestCallback","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"requests","outputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"requestId","type":"uint256"},{"internalType":"uint256","name":"modelId","type":"uint256"},{"internalType":"bytes","name":"input","type":"bytes"},{"internalType":"address","name":"callbackContract","type":"address"},{"internalType":"uint64","name":"gasLimit","type":"uint64"},{"internalType":"bytes","name":"callbackData","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"resetGasPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"resetModelIDs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"server","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_admin","type":"address"}],"name":"setFinancialAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"modelId","type":"uint256"},{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setModelFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"modelId","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"}],"name":"setModelReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"modelId","type":"uint256"},{"internalType":"uint256","name":"receiverPercentage","type":"uint256"}],"name":"setModelReceiverPercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOpml","type":"address"}],"name":"setOpml","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"modelId","type":"uint256"},{"internalType":"bytes32","name":"modelHash","type":"bytes32"},{"internalType":"bytes32","name":"programHash","type":"bytes32"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"receiverPercentage","type":"uint256"}],"name":"updateModel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"requestId","type":"uint256"},{"internalType":"bytes","name":"output","type":"bytes"}],"name":"updateResult","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"modelId","type":"uint256"},{"internalType":"bytes32","name":"modelHash","type":"bytes32"},{"internalType":"bytes32","name":"programHash","type":"bytes32"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"receiverPercentage","type":"uint256"}],"name":"uploadModel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const nftABI = [{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"string","name":"svgData","type":"string"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getSVG","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]

function useArrayRef() {
  const refs: HTMLDivElement[] = []
  return [refs, (el: any) => el && refs.push(el)]
}

const Home: NextPage = () => {
  const { address } = useAccount();
  const chainId = useChainId() as (typeof validChainIds)[number];

  const [requestID, setRequestID] = useState('');
  const [svgStrings, setSvgStrings] = useState<string[]>([]);
  const [loadingTx, setLoadingTx] = useState(false);
  const [loadingCallback, setLoadingCallback] = useState(false);
  const [inputValue, setInputValue] = useState(''); // State for the input field

  useWatchContractEvent({
    chainId: chainId,
    address: watchAddress[chainId] as `0x${string}`,
    abi: oracleABI,
    eventName: 'AICallbackResult',
    onLogs(logs: any) {
      console.log('New logs!', logs)
      for (let i = 0; i < logs.length; i++) {
        let log = logs[i];
        if (log.topics[2] == requestID) {
          console.log('found', log)
          setLoadingCallback(false);
          const hexString = log.args.output.slice(2);
          console.log(hexString);
          const svgStringRes = Buffer.from(hexString, 'hex').toString('utf8');
          console.log(svgStringRes);
          // setSvgString(svgStringRes);
          setSvgStrings(prevSvgStrings => [...prevSvgStrings, svgStringRes]);
        }
      }
    },
    onError(error) {
      console.log(error);
    },
    syncConnectedChain: true,
    strict: true,
  })

  const generateNFT = async() => {
    try {
      const estimatedFee = (await readContract(config, {
        chainId: chainId,
        abi: promptABI,
        address: requestAddress[chainId] as `0x${string}`,
        functionName: 'estimateFee',
        args: [modelID],
      }) as bigint);
      // console.log(estimatedFee);
      // console.log(estimatedFee * BigInt(6) / BigInt(5))

      let prompt = `Generate a unique, minimal, colorful, abstract 256x256 SVG profile picture for Ethereum address ${address} and seed ${Math.floor(Math.random() * 1_000_000) + 1}. Use simple shapes and limited colors. The output should be raw SVG code only, starting with <svg> and ending with </svg>. Specify width and height. Do not include text in image. Do not include any explanation or additional text in your response. ${inputValue}`;

      console.log(prompt);

      const result = await writeContract(config, {
        chainId: chainId,
        abi: promptABI,
        address: requestAddress[chainId] as `0x${string}`,
        functionName: 'calculateAIResult',
        value: estimatedFee,
        args: [modelID, prompt],
      });
      setLoadingTx(true);
      console.log(result);
      while (true) {
        try {
          const res = await getTransactionReceipt(config, {
            chainId: chainId,
            hash: result,
          });
    
          console.log(res); // Do something with the response
    
          // If the transaction is found and valid, you may want to break the loop
          if (res) {
            const logEntry = res.logs[0].topics[2];
            console.log('im there an logEntry is', logEntry);
            setRequestID(logEntry as `0x${string}`);
            setLoadingCallback(true);

            break; // or handle the receipt and exit if needed
          }
        } catch (error) {
          console.error('Error fetching transaction receipt:', error);
        }
    
        // Wait for 5 seconds before making the next request
        await new Promise(resolve => setTimeout(resolve, 5000));
      }

    } catch (error) {
      console.log('Error generating NFT:', error);
    } finally {
      setLoadingTx(false);
    }
  }

  const mintNFT = async (svg: any) => {
    // Your logic to mint the NFT
    // Example:
    // await yourMintNFTFunction();
    console.log('SVG:', svg);

    const result = await writeContract(config, {
      chainId: chainId,
      abi: nftABI,
      address: nftAddress[chainId] as `0x${string}`,
      functionName: 'mint',
      args: [address, svg],
    });
  };

  const handleMintClick = async (index: any) => {
    try {
      console.log('handle mint click', index);
      const svgElement = document.getElementById(`${index}-svg`);
      console.log(svgElement);
      if (svgElement) {
        const svgContent = svgElement.innerHTML;
        await mintNFT(svgContent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Onchain Abstract AI-generated NFTs</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.inputField} // Add styles as needed
          placeholder='Add some custom details.'
        />
        <button onClick={generateNFT} className={styles.modalButton}>
          Generate NFT
        </button>
        {loadingTx && <div>Waiting for transaction...</div>}
        {loadingCallback && <div>Generating NFT...</div>}
        {requestID !== '' && <div>Request ID: {parseInt(requestID, 16)}</div>}
        <div className={styles.nftGrid}>
          {svgStrings.map((svg, index) => (
            <div key={index} className={styles.nftItem}>
              <div
                id={index + "-svg"}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
              <button onClick={() => handleMintClick(index)} className={styles.modalButton}>
                Mint NFT
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
