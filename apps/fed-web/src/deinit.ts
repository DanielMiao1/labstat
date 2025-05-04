type deinit_func = () => void;
const deinit: deinit_func[] = [];

function registerDeinit(func: deinit_func) {
	deinit.push(func);
}

function deinitAll() {
	deinit.forEach(func => {
		func();
	});
}

export default registerDeinit;
export { deinitAll };
