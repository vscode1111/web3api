import { FastifyInstance } from "fastify";
import { EVENTS_ROUTE_URL } from "../../constants/routes";
import { services } from "../..";
import { mapTokenSoldEvent } from "../../utils/mappings";

export default async function createRoute(fastify: FastifyInstance) {
  fastify.get<{ Querystring: { from?: string; to?: string } }>(
    `/${EVENTS_ROUTE_URL}`,
    async function (request) {
      const { from, to } = request.query;

      const events = await services.carBarContract.queryFilter(
        services.eventFilter,
        from ? Number(from) : undefined,
        to ? Number(to) : undefined
      );

      const mappedEvents = await Promise.all(
        events.map(async (event) => {
          if (!event.args.timestamp) {
            const block = await services.provider.getBlock(event.blockNumber);
            return {
              ...mapTokenSoldEvent(event),
              timestamp: block.timestamp,
            };
          }
          return mapTokenSoldEvent(event);
        })
      );

      return mappedEvents;
    }
  );
}
