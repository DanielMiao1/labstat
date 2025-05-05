import cpufreq from "./visualizers/cpufreq";
import disks from "./visualizers/disks";
import graphics from "./visualizers/graphics";
import hostname from "./visualizers/hostname";
import loadavg from "./visualizers/loadavg";
import memory from "./visualizers/memory";
import net from "./visualizers/net";
import os from "./visualizers/os/main";

type handler = (data: unknown) => void;

const handlers: Record<string, handler | null> = {
	cpufreq,
	"!disks": disks,
	"!graphics": graphics,
	"!hostname": hostname,
	loadavg,
	memory,
	"!net": net,
	"!os": os
};

function showData(id: string, data: string) {
	const handler = handlers[id];
	if (handler) handler(JSON.parse(data));
}

export default showData;
