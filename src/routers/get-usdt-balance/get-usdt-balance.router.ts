import { FastifyInstance } from "fastify";
import { services } from "../..";
import { USDT_ROUTE_URL } from "../../constants/routes";
import { toNumber } from "../../utils/converts";

export default async function createRoute(fastify: FastifyInstance) {
  fastify.get<{ Params: { id: string } }>(
    `/${USDT_ROUTE_URL}/balanceOf/:id`,
    async function (request) {
      const id = request.params.id;
      const balance = toNumber(await services.testUSDT.balanceOf(id));
      return { balance };
    }
  );
}
