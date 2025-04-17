import disks from "./visualizers/disks";
import graphics from "./visualizers/graphics";
import hostname from "./visualizers/hostname";
import loadavg from "./visualizers/loadavg";
import net from "./visualizers/net";
import os from "./visualizers/os/main";

const handlers = {
	"!disks": disks,
	"!graphics": graphics,
	"!hostname": hostname,
	"loadavg": loadavg,
	"!net": net,
	"!os": os
}

function showData(id: string, data: string) {
	console.log(id, data);

	const handler = handlers[id];
	if (handler) handler(JSON.parse(data));
}

export default showData;
