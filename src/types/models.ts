export interface CollectionModel {
  collectionId: number;
  name: string;
  url: string;
  tokenCount: number;
  price: number;
  expiryDate: number;
}

export interface UpdateTokenModel {
  expiryDate: number;
}

export interface TokenModel {
  tokenId: number;
  owner: string;
  expiryDate: number;
  sold: boolean;
}
