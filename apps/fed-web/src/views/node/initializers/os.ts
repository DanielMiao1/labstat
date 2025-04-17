function initOS() {
	const container = document.getElementById("collector-os");
	container.classList.add("flex-row");

	const logo = document.createElement("p");
	container.appendChild(logo);
	logo.id = "title-logo";
	logo.classList.add("title-logo", "monospace");

	const title = document.createElement("div");
	title.classList.add("page-title")
	container.appendChild(title);

	const title_text = document.createElement("p");
	title.appendChild(title_text);
	title_text.id = "title-text";
	title_text.classList.add("monospace");

	const kernel_info = document.createElement("p");
	title.appendChild(kernel_info);
	kernel_info.id = "subtitle-kernel";
	kernel_info.classList.add("subtitle-kernel", "monospace", "monospace-light");

	const host_info = document.createElement("p");
	title.appendChild(host_info);
	host_info.id = "subtitle-host";
	host_info.classList.add("subtitle-host", "monospace");
}

export default initOS;
