import createCollectorTitle from "../components/title";
import createList from "../components/list";

function net(data: any) {
	const container = document.getElementById("collector-net");
	
	createCollectorTitle(container, "Network Interfaces");

	const table_data = [{
		"items": ["Interface", "IP", "MAC"]
	}];
	
	Object.keys(data).forEach(intf => {
		const addresses = data[intf];
		addresses.forEach(address => {
			table_data.push({
				"items": [intf, address.cidr, address.mac]
			});
		});
	});

	createList(container, table_data);
}

export default net;
