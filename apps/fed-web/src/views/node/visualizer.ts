import disks from "./visualizers/disks";
import hostname from "./visualizers/hostname";
import net from "./visualizers/net";
import os from "./visualizers/os/main";

const handlers = {
	"!disks": disks,
	"!hostname": hostname,
	"!net": net,
	"!os": os
}

function showData(id: string, data: string) {
	console.log(id, data);

	const handler = handlers[id];
	if (handler) handler(JSON.parse(data));
}

export default showData;
