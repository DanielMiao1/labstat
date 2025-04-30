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
	const data: Record<string, number> = {
		Buffers: 0,
		Cached: 0,
		MemAvailable: 0,
		MemTotal: 0,
		Shmem: 0,
		SReclaimable: 0
	};

	file.toString().split("\n").forEach(line => {
		const separator_index = line.indexOf(":");
		if (separator_index === -1) return;

		const key = stripGreedyFirstLast(line.slice(0, separator_index), " ");
		const value = stripGreedyFirstLast(line.slice(separator_index + 1), " ");

		data[key] = parseInt(value) * 1024;
	});

	const free = data.MemFree ?? 0;
	const total = data.MemTotal ?? 0;
	const buffers = data.Buffers ?? 0;
	const adjusted_cached = (data.Cached ?? 0) - (data.Shmem ?? 0);
	const cache = adjusted_cached + (data.SReclaimable ?? 0);
	const active = total - free - buffers - cache;

	return { active, buffers, cache, free, total };
}

class Memory implements Collector {
	id = "memory";

	getData() {
		if (isLinux() && existsSync("/proc/meminfo")) {
			const proc_data = parseProcFile();
			return proc_data;
		}
	}
}

export default Memory;
