import Fastify from "fastify";
import fastifyStatic from "@fastify/static";

import { join } from "path";

const server = Fastify();

server.register(fastifyStatic, {
  prefix: "/",
  root: join(process.cwd(), "dist/fed-web")
});

server.get("/api/nodes", (_, reply) => {
  reply.send("asdfghjm,");
})

server.listen({
  host: "0.0.0.0",
  port: 17221
}, err => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log("[ready] http://0.0.0.0:17221");
  }
});
