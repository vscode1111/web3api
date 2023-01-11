import joi from "joi";
import { FastifyInstance } from "fastify";
import {
  COLLECTIONS_ROUTE_URL,
  TOKENS_ROUTE_URL,
} from "../../constants/routes";
import { services } from "../..";
import { UpdateTokenModel } from "../../types/models";
import { checkIfNumber } from "../../utils/checks";

const updateTokenSchema = joi.object({
  expiryDate: joi.number().required(),
});

export default async function createRoute(fastify: FastifyInstance) {
  fastify.put<{
    Params: { collectionId: string; tokenId: string };
    Body: UpdateTokenModel;
  }>(
    `/${COLLECTIONS_ROUTE_URL}/:collectionId/${TOKENS_ROUTE_URL}/:tokenId`,
    async function (request) {
      const collectionId = checkIfNumber(request.params.collectionId);
      const tokenId = checkIfNumber(request.params.tokenId);

      const body = request.body;
      joi.attempt(body, updateTokenSchema);

      const tx = await services.carBarContract.updateToken(
        collectionId,
        tokenId,
        body.expiryDate
      );
      console.log("tx", tx.hash);

      await tx.wait();

      const token = await services.carBarContract.fetchToken(
        collectionId,
        tokenId
      );

      return {
        tokenId: token.tokenId,
        owner: token.owner,
        expiryDate: token.expiryDate,
        sold: token.sold,
      };
    }
  );
}
