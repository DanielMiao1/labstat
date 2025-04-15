interface NodeOptions {
  hostname: string;
}

async function getNodes(): Promise<NodeOptions> {
	const request = await fetch("/api/nodes");

	return await request.json();
}

export { getNodes, type NodeOptions };
