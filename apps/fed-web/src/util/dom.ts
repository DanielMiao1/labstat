function removeChildren(element: HTMLElement) {
	const child = element.children.item(0);

	if (child) {
		child.remove();
		removeChildren(element);
	}
}

export { removeChildren };
