import { FastifyInstance } from "fastify";
import { services } from "../..";
import {
  COLLECTIONS_ROUTE_URL,
  TOKENS_ROUTE_URL,
} from "../../constants/routes";
import { checkIfNumber } from "../../utils/checks";
import { mapTokenItem } from "../../utils/mappings";

export default async function createRoute(fastify: FastifyInstance) {
  fastify.get<{ Params: { collectionId: string; tokenId: string } }>(
    `/${COLLECTIONS_ROUTE_URL}/:collectionId/${TOKENS_ROUTE_URL}/:tokenId`,
    async function (request) {
      const collectionId = checkIfNumber(request.params.collectionId);
      const tokenId = checkIfNumber(request.params.tokenId);
      const token = await services.carBarContract.fetchToken(
        collectionId,
        tokenId
      );
      return mapTokenItem(token);
    }
  );
}
