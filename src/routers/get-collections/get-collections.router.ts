import { FastifyInstance } from "fastify";
import { COLLECTIONS_ROUTE_URL } from "../../constants/routes";
import { services } from "../..";
import { mapCollectionItem } from "../../utils/mappings";

export default async function createRoute(fastify: FastifyInstance) {
  fastify.get(`/${COLLECTIONS_ROUTE_URL}`, async function () {
    const collections = await services.carBarContract.fetchCollections();
    return collections.map(mapCollectionItem);
  });
}
