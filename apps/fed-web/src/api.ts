interface NodeOptions {
  hostname: string;
	[key: string]: string;
}

async function getNodes(): Promise<NodeOptions> {
	const request = await fetch("/api/nodes");
	return await request.json() as NodeOptions;
}

export { getNodes, type NodeOptions };
