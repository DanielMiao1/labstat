import createCollectorTitle from "../components/title";
import createList from "../components/list";
import readableBytes from "../../../util/units";

function disks(data: any, container: HTMLElement) {
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

		table_data.push({
			items
		});
	});

	createList(container, table_data);
}

export default disks;
