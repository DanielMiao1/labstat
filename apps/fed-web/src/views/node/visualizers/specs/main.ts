function specs(data: any) {
	const container = document.getElementById("collector-specs");

	const text = document.createElement("p");
	container?.appendChild(text);
	text.innerText = JSON.stringify(data);
}

export default specs;
