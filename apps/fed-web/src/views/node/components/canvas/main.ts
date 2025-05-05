interface CanvasOptions {
	size: number;
}

function createCanvas(options: CanvasOptions): HTMLCanvasElement {
	const canvas = document.createElement("canvas");

	canvas.style.width = options.size.toString() + "px";
	canvas.style.height = options.size.toString() + "px";
	canvas.width = options.size * 2;
	canvas.height = options.size * 2;

	return canvas;
}

export default createCanvas;
export { type CanvasOptions };
export * from "./charts/pie/main";
