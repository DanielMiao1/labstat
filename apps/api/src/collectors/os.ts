import Collector from "./base";
import figlet from "figlet";
import slant from "figlet/importable-fonts/Slant.js";
import { stripAllQuotes } from "../../util/string";
import { existsSync, readFileSync } from "fs";
import { execSync } from "child_process";

figlet.parseFont("Slant", slant);

const PROCESS_PLATFORMS = {
	"aix": "AIX",
	"darwin": "macOS",
	"freebsd": "FreeBSD",
	"openbsd": "OpenBSD",
	"win32": "Windows",
}

interface OSInfo {
	os: string;
	kernel?: string;
	version?: string;
}

interface FullOSInfo extends OSInfo {
	ascii: string;
}

function generateAscii(text: string): Promise<string> {
	return figlet(text, { font: "Slant" });
}

function identifyOS(): OSInfo {
	const platform = process.platform;
	const name = PROCESS_PLATFORMS[platform];

	if (name) return { os: name };
	if (platform !== "linux") return { os: "unknown" }

	const kernel = execSync("uname -r").toString().slice(0, -1);

	if (existsSync("/etc/os-release")) {
		const release = readFileSync("/etc/os-release").toString();
		const lines = release.split("\n");

		let name: string;
		let version: string;

		lines.some(line => {
			if (/^NAME="/.test(line)) {
				const text = line.slice(5)
				name = stripAllQuotes(text);
			} else if (/^VERSION_ID="/.test(line)) {
				const text = line.slice(11);
				version = stripAllQuotes(text);
			}

			return name && version;
		});

		if (name) return {
			os: name,
			kernel,
			version
		}
	}

	return {
		os: "Linux",
		kernel
	}
}

class OS extends Collector {
	id = "!os";

	async getData(): FullOSInfo {
		const data = identifyOS();
		const ascii = await generateAscii(data.os);

		return {...data, ascii};
	}
}

export default OS;
