import Fastify from "fastify";

import { activeCollectors, aggregate } from "./data";

const server = Fastify();

server.get("/api/collectors", (_ , reply) => {
	reply.send({
		"collectors": activeCollectors()
	});
})

server.post("/api/data", {
	schema: {
		body: {
			type: "array",
			items: {
				type: "string"
			}
		}
	}
}, (request, reply) => {
	const ids = request.body;
	reply.send(aggregate(ids));
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
