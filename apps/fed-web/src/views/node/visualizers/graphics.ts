import createCollectorTitle from "../components/title";
import createList from "../components/list";
import type { graphics as graphicsData } from "systeminformation";

type graphics_info = Awaited<ReturnType<typeof graphicsData>>;

function graphics(data: graphics_info) {
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

			return (controller.bus || id) ?? "";
		})();

		const vram = (() => {
			if (!controller.vram) return "Unknown";
			const amount = controller.vram.toString() + " MB";

			if (controller.vramDynamic) return amount + " (DVMT)";
			return amount;
		})();

		table_data.push({
			"items": [vendor, controller.model, bus, vram]
		});
	});

	createList(container, table_data);
}

export default graphics;
