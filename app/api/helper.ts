import { ethers } from "ethers";

export const provider = new ethers.JsonRpcProvider(
   "https://soneium-minato.rpc.scs.startale.com?apikey=" +
      process.env.SCS_API_KEY
);
