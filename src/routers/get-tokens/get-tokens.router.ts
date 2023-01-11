import { FastifyInstance } from "fastify";
import { services } from "../..";
import {
  COLLECTIONS_ROUTE_URL,
  TOKENS_ROUTE_URL,
} from "../../constants/routes";
import { checkIfNumber } from "../../utils/checks";
import { mapTokenItem } from "../../utils/mappings";

export default async function createRoute(fastify: FastifyInstance) {
  fastify.get<{ Params: { id: string } }>(
    `/${COLLECTIONS_ROUTE_URL}/:id/${TOKENS_ROUTE_URL}`,
    async function (request) {
      const id = checkIfNumber(request.params.id);
      const tokens = await services.carBarContract.fetchTokens(id);
      return tokens.map(mapTokenItem);
    }
  );
}
