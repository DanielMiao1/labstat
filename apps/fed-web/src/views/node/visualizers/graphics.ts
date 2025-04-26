import createCollectorTitle from "../components/title";
import createList from "../components/list";

function graphics(data: unknown) {
	const container = document.getElementById("collector-!graphics");
	if (!container) return;
	
	createCollectorTitle(container, "Graphics");

	const table_data = [{
		"items": ["Vendor", "Model", "Bus", "VRAM"]
	}];

	const controllers = data.controllers;
	
	controllers.forEach(controller => {
		const vendor = (() => {
			if (controller.subVendor) {
				return `${controller.vendor}/${controller.subVendor}`;
			}

			return controller.vendor;
		})();

		const bus = (() => {
			const id = controller.busAddress ?? controller.subDeviceId;

			if (id && controller.bus) {
				return `${id} (${controller.bus})`;
			}

			return controller.bus ?? id ?? "";
		})();

		const vram = (() => {
			const amount = controller.vram + " MB";

			if (controller.vramDynamic) {
				return amount + " (DVMT)";
			}

			return amount;
		})();

		table_data.push({
			"items": [vendor, controller.model, bus, vram]
		});
	});

	createList(container, table_data);
}

export default graphics;
