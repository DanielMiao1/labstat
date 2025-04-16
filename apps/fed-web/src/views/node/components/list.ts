interface RowOptions {
	tooltip?: string;
	items: string[];
}

type list_options = RowOptions[]

function createList(container: HTMLElement, data: list_options) {
	const table = document.createElement("table");
	container.appendChild(table);

	data.forEach(row => {
		const tr = document.createElement("tr");
		table.appendChild(tr);

		row.items.forEach(item => {
			const td = document.createElement("td");
			td.innerText = item;
			tr.appendChild(td);
		});

		if (row.tooltip) tr.title = row.tooltip;
	});
}

export default createList;
