export async function fetchEthPrice() {
   const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
   );
   if (!response.ok) {
      throw new Error("Failed to fetch ETH price");
   }
   const data = await response.json();
   return data.ethereum.usd;
}
