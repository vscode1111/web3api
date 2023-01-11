import { providers } from "ethers";
import { config } from "../config";
import { connectContracts } from "../contracts";
import { CarBarContract, TestUSDT } from "../typechain-types";
import { TokenSoldEventFilter } from "../typechain-types/CarBarContract";

export class Services {
  public provider: providers.JsonRpcProvider;
  public carBarContract: CarBarContract;
  public eventFilter!: TokenSoldEventFilter;
  public testUSDT: TestUSDT;

  constructor() {
    const { provider, carBarContract, testUSDT } = connectContracts(
      config.production ? "polygon" : "mumbai"
    );
    this.provider = provider;
    this.carBarContract = carBarContract;
    this.testUSDT = testUSDT;
  }

  async init() {
    this.eventFilter = await this.carBarContract.filters.TokenSold();
  }
}
