interface NodeOptions {
	[key: string]: string;
	hostname: string;
}

async function getNodes(): Promise<NodeOptions> {
	const request = await fetch("/api/nodes");
	return await request.json() as NodeOptions;
}

export { getNodes, type NodeOptions };
