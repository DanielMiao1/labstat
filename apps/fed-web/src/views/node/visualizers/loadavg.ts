function loadavg(data: [number, number, number]) {
	const container = document.getElementById("collector-loadavg");
	if (!container) return;

	const data_1m = document.getElementById("loadavg_1m");
	const data_5m = document.getElementById("loadavg_5m");
	const data_15m = document.getElementById("loadavg_15m");

	[data_1m.innerText, data_5m.innerText, data_15m.innerText] = data;
}

export default loadavg;
