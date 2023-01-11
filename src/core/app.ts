import fastify, { FastifyInstance } from "fastify";
import { Server } from "http";
import { config } from "../config";
import routers from "../routers";

export class App {
  private server: FastifyInstance<Server>;

  constructor() {
    this.server = fastify({
      // Logger only for production
      // logger: !!(process.env.NODE_ENV !== "dev"),
    });
    this.server.register(routers);
  }

  public start(): void {
    const port = config.port;
    this.server.listen({ port: config.port, host: "0.0.0.0" });
    console.log(`🚀 Fastify server is running on http://localhost:${port}`);
  }
}
