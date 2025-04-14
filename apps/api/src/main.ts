import Fastify from "fastify";

const server = Fastify();

server.post("/api", (request, reply) => {
  reply.send("haiii");
});

server.listen({
  host: "0.0.0.0",
  port: 17220
}, err => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log("[ready] http://0.0.0.0:17220");
  }
});
