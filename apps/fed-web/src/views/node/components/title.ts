function createCollectorTitle(container: HTMLElement, text: string) {
	const title = document.createElement("p");
	title.innerText = text;
	title.classList.add("title");
	container.appendChild(title);
}

export default createCollectorTitle;
