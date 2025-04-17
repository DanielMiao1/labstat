import Collector from "./base";

class Specs extends Collector {
	id = "!specs";

	getData() {
		return {test: "testdata"};
	}
}

export default Specs;
