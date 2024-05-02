export const githubOwner = "thecryptoneer";
export const githubRepo = "about";
export const githubUrl = `https://github.com/${githubOwner}/${githubRepo}/`;

export const maxDockItemSize = 75;
export const dockItemSize = 70;
export const dockItemDistance = 200;
export const fps = 120;

export const networkTestImageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Ad-tech_London_2010_%285%29.JPG/1920px-Ad-tech_London_2010_%285%29.JPG";
export const networkTestImageSize = 4619096; // bytes
export const networkTestInterval = 10000; // ms
export const networkTestUnit = "megabyte"; // "byte" , "kilobyte", "megabyte"
export const networkTestThreshold = 7;

import { cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const wagmiOptions: any = {};

const metadata = {
  name: "Hi there!",
  description: "Thecryptoneer",
  url: "http://localhost:3000", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [mainnet, sepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  ...wagmiOptions, // Optional - Override createConfig parameters
});

export const demoUserId = "66339d2a667ffb9a939afef3";
export const resumeId = "6633be7e7b7d520cccdc6bf3";
