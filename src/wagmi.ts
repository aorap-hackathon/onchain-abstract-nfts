import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem'

import {
  optimismSepolia,
  sepolia
} from 'wagmi/chains';


export const config = getDefaultConfig({
  appName: 'Onchain Abstract AI-generated NFTs',
  projectId: 'a0423bd4d5dfb377c736fc030a4b2f93',
  chains: [
    sepolia,
    optimismSepolia,
  ],
  transports: {
    // [sepolia.id]: http(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`),
    // [optimismSepolia.id]: http(`https://optimism-sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`),
    // [sepolia.id]: http(`https://rpc.ankr.com/eth_sepolia/${process.env.ANKR_API_KEY}`),
    // [optimismSepolia.id]: http(`https://rpc.ankr.com/optimism_sepolia/${process.env.ANKR_API_KEY}`),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`),
    [optimismSepolia.id]: http(`https://opt-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`),
  },
  ssr: true,
  // syncConnectedChain: true,
});