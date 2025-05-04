import { deinitAll } from "./deinit";
import getHash from "./util/hash";
import mainView from "./views/main";
import nodeView from "./views/node/main";

import "./main.css";

function update() {
	deinitAll();

	if (document.getElementsByTagName("main").length) {
		document.getElementsByTagName("main").item(0)?.remove();
	}

	const content = document.createElement("main");
	document.body.appendChild(content);

	const route = getHash();

	if (!route) {
		mainView(content);
	} else {
		void nodeView(content);
	}
}

update();
window.addEventListener("hashchange", update);
