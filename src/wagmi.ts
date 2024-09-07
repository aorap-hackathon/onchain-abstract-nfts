import { getDefaultConfig } from '@rainbow-me/rainbowkit';
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
  ssr: true,
});