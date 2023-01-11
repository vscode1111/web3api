import { FastifyInstance } from "fastify";
import { services } from "../..";
import { ZERO } from "../../constants/numbers";
import { BLOCK_ROUTE_URL } from "../../constants/routes";
import { checkIfNumber } from "../../utils/checks";
import { toNumber } from "../../utils/converts";

export default async function createRoute(fastify: FastifyInstance) {
  fastify.get<{ Params: { id: string } }>(
    `/${BLOCK_ROUTE_URL}/:id`,
    async function (request) {
      const rawId = request.params.id;

      let id: string | number = rawId;
      if (rawId !== "latest") {
        id = checkIfNumber(request.params.id);
      }

      const latestBlock = await services.provider.getBlock(id);
      return {
        ...latestBlock,
        gasLimit: toNumber(latestBlock.gasLimit),
        gasUsed: toNumber(latestBlock.gasUsed),
        baseFeePerGas: toNumber(latestBlock.baseFeePerGas || ZERO),
        _difficulty: toNumber(latestBlock._difficulty),
      };
    }
  );
}
