import { existsSync, readFileSync } from "fs";
import { isLinux } from "./os";
import { stripGreedyFirstLast } from "../util/string";
import type Collector from "./base";

type memory_data = Record<string, number>;

function parseProcFile(): memory_data {
	/**
	 * Parses data from /proc/meminfo.
	 *
	 * Although the file specifies the kilobyte (kB) unit for the data, most
	 * systems in fact display data in kibibytes (KiB).
	 */

	const file = readFileSync("/proc/meminfo");
	const data: Record<string, number> = {}

	file.toString().split("\n").forEach(line => {
		const separator_index = line.indexOf(":");
		if (separator_index === -1) return;

		const key = stripGreedyFirstLast(line.slice(0, separator_index), " ");
		const value = stripGreedyFirstLast(line.slice(separator_index + 1), " ");

		data[key] = parseInt(value) * 1024;
	});

	return {
		active: data.MemTotal - data.MemAvailable,
		buffers: data.Buffers,
		cache: data.Cached + data.SReclaimable - data.Shmem,
		free: data.MemAvailable,
		total: data.MemTotal
	};
}

class Memory implements Collector {
	id = "memory";

	async getData() {
		if (isLinux() && existsSync("/proc/meminfo")) {
			const proc_data = parseProcFile();
			return proc_data;
		}
	}
}

export default Memory;
