import mainView from "./views/main";
import nodeView from "./views/node";
import getHash from "./util/hash";

async function update() {
	if (document.getElementsByTagName("main").length) {
		document.getElementsByTagName("main")[0]?.remove();
	}

	const content = document.createElement("main");
	document.body.appendChild(content);

	const route = getHash();

	if (!route) {
		await mainView(content);
	} else {
    await nodeView(content);
  }
}

update();

window.addEventListener("hashchange", () => {
	update();
});
