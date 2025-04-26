import * as Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyWebsocket from "@fastify/websocket";
import WebSocket from "ws";
import { join } from "path";

import { getNodes, initDataFile, writeNode } from "./nodes";

interface Collectors {
	collectors: string[];
}

const server = Fastify.fastify();
initDataFile();

server.register(fastifyWebsocket);
server.register(ws_server => {
	ws_server.get(
		"/api/:node/data",
		{ websocket: true },
		(socket, request: Fastify.FastifyRequest<{ Params: { node: string } }>) => {
			const { node } = request.params;
			const host = `ws://${node}:17220/api/data`;

			const node_socket = new WebSocket(host);
			const node_ready = new Promise(resolve => {
				node_socket.addEventListener("open", resolve);
			});

			node_socket.addEventListener("message", message => {
				socket.send(message.data);
			});

			socket.on("message", message => {
				void node_ready.then(() => {
					node_socket.send(message);
				});
			});
		}
	);
});

server.register(fastifyStatic, {
	prefix: "/",
	root: join(process.cwd(), "dist/fed-web")
});

server.get("/api/nodes", (_, reply) => {
	reply.send(getNodes());
});

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
	const { ip } = request;

	writeNode(ip, request.body);
	reply.send("");
});

server.get("/api/:node/collectors", async (
	request: Fastify.FastifyRequest<{ Params: { node: string } }>,
	reply
) => {
	const { node } = request.params;
	const url = `http://${node}:17220/api/collectors`;

	const api_request = await fetch(url);
	const collectors = await api_request.json() as Collectors;

	reply.send(collectors);
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
