import {
	existsSync,
	mkdirSync,
	readFileSync,
	writeFileSync
} from "fs";

import { join } from "path";

interface NodeOptions {
	hostname: string;
}

const file = join(process.cwd(), "data/fed/nodes.json");

let nodes = {};

function syncFromFile() {
	const data = readFileSync(file);
	nodes = JSON.parse(data.toString());
}

function initDataFile() {
	if (existsSync(file)) {
		syncFromFile();
		return;
	}

	const file_dir = join(file, "..");

	if (!existsSync(file_dir)) {
		mkdirSync(file_dir, {
			recursive: true
		});
	}

	writeFileSync(file, "{}");
	syncFromFile();
}

function getNodes() {
	return nodes;
}

function writeNode(ip: string, options: NodeOptions) {
	nodes[ip] = options;
	writeFileSync(file, JSON.stringify(nodes));
}

export { getNodes, initDataFile, writeNode };
