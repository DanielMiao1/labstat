/**
 * For now, the ASCII-art logo is retrieved from the fastfetch CLI program
 * through githubusercontent.com.
 * 
 * In the future, this will be replaced by custom logos.
 */

const OS_ALIAS = {
	"Alpine Linux": "alpine",
	"Arch Linux": "arch"
}

function removeBashVariables(text) {
	let clean_text = "";
	let index = 0;
	let loop = 0;

	while (index < text.length) {
		if (loop++ >= 200) return text;

		const next_var = text.indexOf("$", index);
		if (next_var === -1) {
			clean_text += text.slice(index);
			break;
		}

		clean_text += text.slice(index, next_var);
		
		if (text[next_var + 1] === "{") {
			const var_end = text.indexOf("}", next_var);
			index = var_end + 1;
		} else {
			index = next_var + 2;
		}
	}

	return clean_text;
}

async function getLogo(os: string) {
	const name = OS_ALIAS[os] ?? os;
	const url = `https://raw.githubusercontent.com/fastfetch-cli/fastfetch/refs/tags/2.41.0/src/logo/ascii/${name}.txt`;

	const request = await fetch(url);

	if (!request.ok) return "[Logo not found]";

	const response = await request.text();
	return removeBashVariables(response);
}

export default getLogo;
