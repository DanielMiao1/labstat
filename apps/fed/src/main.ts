import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { join } from "path";

import { getNodes, initDataFile, writeNode } from "./nodes";

const server = Fastify();
initDataFile();

server.register(fastifyStatic, {
	prefix: "/",
	root: join(process.cwd(), "dist/fed-web")
});

server.get("/api/nodes", (_, reply) => {
	reply.send(getNodes());
})

server.post("/api/register-node", {
	schema: {
		body: {
			additionalProperties: false,
			type: "object",
			properties: {
				hostname: {
					type: "string"
				}
			},
			required: ["hostname"]
		}
	}
}, (request, reply) => {
	const ip = request.ip;

	writeNode(ip, request.body);
	reply.send("");
});

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
