import {
  CarBarContract,
  TokenSoldEvent,
  TokenSoldEventObject,
} from "../typechain-types/CarBarContract";
import { CollectionModel, TokenModel } from "../types/models";
import { toNumber } from "./converts";

const PRICE_FACTOR = 1e12;

export function mapCollectionItem(
  item: CarBarContract.CollectionItemStructOutput
): CollectionModel {
  return {
    collectionId: item.collectionId,
    name: item.name,
    url: item.url,
    tokenCount: item.tokenCount,
    price: toNumber(item.price, PRICE_FACTOR),
    expiryDate: item.expiryDate,
  };
}

export function mapTokenItem(
  item: CarBarContract.TokenItemStructOutput
): TokenModel {
  return {
    tokenId: item.tokenId,
    owner: item.owner,
    expiryDate: item.expiryDate,
    sold: item.sold,
  };
}

export function mapTokenSoldEvent(item: TokenSoldEvent): Omit<
  TokenSoldEventObject,
  "price"
> & {
  transactionHash: string;
  blockNumber: number;
  price: Number;
} {
  return {
    transactionHash: item.transactionHash,
    blockNumber: item.blockNumber,
    collectionId: item.args[0],
    tokenId: item.args[1],
    seller: item.args[2],
    owner: item.args[3],
    price: toNumber(item.args[4], PRICE_FACTOR),
    timestamp: item.args[5],
  };
}
