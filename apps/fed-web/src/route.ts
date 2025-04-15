import mainView from "./views/main";

async function update() {
	if (document.getElementsByTagName("main").length) {
		document.getElementsByTagName("main")[0]?.remove();
	}

	const content = document.createElement("main");
	document.body.appendChild(content);

	const route = (() => {
		const hash = document.location.hash;
		if (hash.startsWith("#")) {
			return hash.slice(1);
		}

		return hash;
	})();


	if (!route) {
		await mainView(content);
	}
}

update();

window.addEventListener("hashchange", () => {
	update();
});
