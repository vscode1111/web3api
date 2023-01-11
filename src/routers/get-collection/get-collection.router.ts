import { FastifyInstance } from "fastify";
import { services } from "../..";
import { COLLECTIONS_ROUTE_URL } from "../../constants/routes";
import { checkIfNumber } from "../../utils/checks";
import { mapCollectionItem } from "../../utils/mappings";

export default async function createRoute(fastify: FastifyInstance) {
  fastify.get<{ Params: { id: string } }>(
    `/${COLLECTIONS_ROUTE_URL}/:id`,
    async function (request) {
      const id = checkIfNumber(request.params.id);
      const collection = await services.carBarContract.fetchCollection(id);
      return mapCollectionItem(collection);
    }
  );
}
