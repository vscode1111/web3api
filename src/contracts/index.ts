import { ethers, providers } from "ethers";
import { config } from "../config";
import { CONTRACTS, DeployNetworks, TOKENS } from "../constants/addresses";
import {
  CarBarContract,
  CarBarContract__factory,
  TestUSDT,
  TestUSDT__factory,
} from "../typechain-types";

export function connectContracts(network: keyof DeployNetworks): {
  provider: providers.JsonRpcProvider;
  carBarContract: CarBarContract;
  testUSDT: TestUSDT;
} {
  const provider = new ethers.providers.JsonRpcProvider(config.providerUrl);

  const wallet = new ethers.Wallet(config.metamaskPrivateKey, provider);

  const carBarContract = CarBarContract__factory.connect(
    CONTRACTS.CAR_BAR[network],
    wallet
  );

  const testUSDT = TestUSDT__factory.connect(TOKENS.USDT[network], wallet);

  return { provider, carBarContract, testUSDT };
}
