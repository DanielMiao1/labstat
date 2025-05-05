import { cmdExists, cmdExitCode } from "../util/shell";
import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { isLinux, isWindows } from "./os";
import { loadavg } from "os";
import { round } from "../util/number";
import type Collector from "./base";

function invokeSysctl(name: string): string | undefined {
	try {
		const output = execSync(`sysctl ${name}`).toString();
		const separator_index = output.indexOf(":");
		if (separator_index === -1) return;

		return output.slice(separator_index + 2, -1);
	} catch {
		console.warn(
			"[collectors/cpu] error in calling sysctl, data may be incomplete"
		);

		return;
	}
}

class LoadAvg implements Collector {
	id = "loadavg";

	constructor() {
		if (isWindows()) {
			this.inactive = true;
		}
	}

	getData() {
		/**
		 * Retrieve loadavg triplet using the os module.
		 *
		 * Many BSD systems return results with over 10 decimal places, so re-round
		 * each value to 2 decimals.
		 */

		const [avg_1, avg_5, avg_15] = loadavg();

		return [
			round(avg_1, 2),
			round(avg_5, 2),
			round(avg_15, 2)
		];
	}
}

class CPUFreq implements Collector {
	id = "cpufreq";
	#n_cpus: number;
	#hasSysctl = false;
	#hasSysDevices = false;

	constructor() {
		/**
		 * Determine which method of getting the CPU frequency is best.
		 *
		 * The sysctl command can only get cpu information on some BSD systems,
		 * even though a command with the same name exists on Linux.
		 */

		if (isWindows()) {
			this.inactive = true;
			return;
		}

		if (isLinux() && existsSync("/sys/devices/system/cpu")) {
			this.#hasSysDevices = true;
		} else if (cmdExists("sysctl") && cmdExitCode("sysctl dev.cpu") === 0) {
			this.#hasSysctl = true;
		} else {
			this.inactive = true;
			return;
		}

		this.#n_cpus = parseInt(execSync("getconf _NPROCESSORS_ONLN").toString());
	}

	getData(index = 0): number[] {
		if (index > this.#n_cpus - 1) return [];

		let data: number;
		if (this.#hasSysDevices) data = this.#getDataLinux(index);
		if (this.#hasSysctl) data = this.#getDataBSD(index);

		return [data, ...this.getData(index + 1)];
	}

	#getDataBSD(index: number): number {
		/**
		 * Calls the BSD sysctl command to find CPU frequencies.
		 */

		const name = `dev.cpu.${index.toString()}.freq`;
		const data = invokeSysctl(name);
		if (!data) return 0;

		// Frequencies are returned in MHz by sysctl, so convert them to Hz.
		return parseInt(data) * 1000;
	}

	#getDataLinux(index: number): number {
		/**
		 * Reads data from /sys/devices/system/cpu for CPU frequencies.
		 */

		const path = (
			`/sys/devices/system/cpu/cpu${index.toString()}/cpufreq`
			+ "/scaling_cur_freq"
		);

		if (!existsSync(path)) return 0;

		const data = readFileSync(path).toString();
		return parseInt(data) * 1000;
	}
}

export { CPUFreq, LoadAvg };
