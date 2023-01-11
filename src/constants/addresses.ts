export interface DeployNetworks {
  mumbai: string;
  polygon: string;
}

export enum CONTRACT_LIST {
  CAR_BAR = "CAR_BAR",
}

export enum TOKEN_LIST {
  USDT = "USDT",
}

export const CONTRACTS: Record<CONTRACT_LIST, DeployNetworks> = {
  CAR_BAR: {
    mumbai: "0x4996FC03735B44b53531530a02A0EDd7C6e19b69",
    polygon: "0xaB438A70A0d2b7D2AeD0dd08c3E65521b363e326",
  },
};

export const TOKENS: Record<TOKEN_LIST, DeployNetworks> = {
  USDT: {
    mumbai: "0x584a302B104530C8cd376d06dFe857CEAB409766",
    polygon: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  },
};
