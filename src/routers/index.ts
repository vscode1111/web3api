import getRoot from "./get-root/get-root.router";
import getCollections from "./get-collections/get-collections.router";
import getCollection from "./get-collection/get-collection.router";
import getTokens from "./get-tokens/get-tokens.router";
import getToken from "./get-token/get-token.router";
import updateToken from "./update-token/update-token.router";
import getUSDTBalance from "./get-usdt-balance/get-usdt-balance.router";
import getEvents from "./get-events/get-events.router";
import getBlocks from "./get-blocks/get-blocks.router";
import { FastifyInstance } from "fastify";

export default async function router(fastify: FastifyInstance) {
  fastify.register(getRoot);
  fastify.register(getCollections);
  fastify.register(getCollection);
  fastify.register(getTokens);
  fastify.register(getToken);
  fastify.register(updateToken);
  fastify.register(getUSDTBalance);
  fastify.register(getEvents);
  fastify.register(getBlocks);
}
