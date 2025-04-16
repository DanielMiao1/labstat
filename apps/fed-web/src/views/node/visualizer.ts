import net from "./visualizers/net";
import disks from "./visualizers/disks";
import os from "./visualizers/os/main";

const handlers = {
	"!disks": disks,
	"!net": net,
	"!os": os
}

function showData(id: string, data: string) {
	console.log(id, data);

	const handler = handlers[id];
	if (handler) handler(JSON.parse(data));
}

export default showData;
