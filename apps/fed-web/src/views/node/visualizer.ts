import disks from "./visualizers/disks";
import graphics from "./visualizers/graphics";
import hostname from "./visualizers/hostname";
import net from "./visualizers/net";
import os from "./visualizers/os/main";
import specs from "./visualizers/specs/main";

const handlers = {
	"!disks": disks,
	"!graphics": graphics,
	"!hostname": hostname,
	"!net": net,
	"!os": os,
	"!specs": specs
}

function showData(id: string, data: string) {
	console.log(id, data);

	const handler = handlers[id];
	if (handler) handler(JSON.parse(data));
}

export default showData;
