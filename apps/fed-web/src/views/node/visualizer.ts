import net from "./visualizers/net";
import disks from "./visualizers/disks";

const handlers = {
	"!disks": disks,
	"!net": net
}

function showData(id: string, data: string) {
	const container = document.getElementById(`collector-${id}`);

	const handler = handlers[id];
	if (handler) handler(JSON.parse(data), container);
}

export default showData;
