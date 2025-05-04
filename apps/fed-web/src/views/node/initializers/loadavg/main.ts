import createCollectorTitle from "../../components/title";

function initLoadavg() {
	void import("./loadavg.css");

	const container = document.getElementById("collector-loadavg");
	if (!container) return;

	createCollectorTitle(container, "Load Averages");

	const data_container = document.createElement("div");
	container.appendChild(data_container);
	data_container.classList.add("loadavg-data", "flex-col");

	const container_top = document.createElement("div");
	data_container.appendChild(container_top);
	container_top.classList.add("flex-col");

	const data_1m = document.createElement("p");
	container_top.appendChild(data_1m);
	data_1m.id = "loadavg_1m";
	data_1m.classList.add("p-xlarge", "p-bold", "p-center");

	const label_1m = document.createElement("p");
	container_top.appendChild(label_1m);
	label_1m.innerText = "1 min";
	label_1m.classList.add("p-small", "p-center");

	const container_bottom = document.createElement("div");
	data_container.appendChild(container_bottom);
	container_bottom.classList.add("loadavg-bottom", "flex-row");

	const left_bot = document.createElement("div");
	container_bottom.appendChild(left_bot);
	left_bot.classList.add("flex-col");

	const data_5m = document.createElement("p");
	left_bot.appendChild(data_5m);
	data_5m.id = "loadavg_5m";
	data_5m.classList.add("p-large", "p-bold", "p-center");

	const label_5m = document.createElement("p");
	left_bot.appendChild(label_5m);
	label_5m.innerText = "5 min";
	label_5m.classList.add("p-small", "p-center");

	const right_bot = document.createElement("div");
	container_bottom.appendChild(right_bot);
	right_bot.classList.add("flex-col");

	const data_15m = document.createElement("p");
	right_bot.appendChild(data_15m);
	data_15m.id = "loadavg_15m";
	data_15m.classList.add("p-large", "p-bold", "p-center");

	const label_15m = document.createElement("p");
	right_bot.appendChild(label_15m);
	label_15m.innerText = "15 min";
	label_15m.classList.add("p-small", "p-center");
}

export default initLoadavg;
