import createCollectorTitle from "../components/title";
import createList from "../components/list";
import { readableBytes } from "../../../util/units";
import { truncate } from "../../../util/string";
import type { diskLayout as diskData } from "systeminformation";

type disk_info = Awaited<ReturnType<typeof diskData>>;

function disks(data: disk_info) {
	const container = document.getElementById("collector-!disks");
	if (!container) return;

	createCollectorTitle(container, "Disks");

	const table_data = [{
		items: ["Mountpoint", "Size", "Type"]
	}];

	data.forEach(disk => {
		const items = [
			disk.device,
			readableBytes(disk.size),
			`${disk.type}/${disk.interfaceType}`
		];

		const name = truncate(disk.name, 25);
		const sn = truncate(disk.serialNum, 25);
		const firmware = truncate(disk.firmwareRevision, 25);
		const tooltip = `${name}\nS/N: ${sn}\nFirmware: ${firmware}`;

		table_data.push({
			items,
			tooltip
		});
	});

	createList(container, table_data);
}

export default disks;
