/**
 * For now, the ASCII-art logo is retrieved from the fastfetch CLI program
 * through githubusercontent.com.
 *
 * In the future, this will be replaced by custom logos.
 */

import json from "./os_aliases.json";
import { padNewLine } from "../../../../util/string";

const OS_ALIAS = json.aliases as Record<string, string>;

function removeBashVariables(text: string): string {
	const next_var = text.indexOf("$");
	if (next_var === -1) return text;

	const first = text.slice(0, next_var);

	if (text.at(next_var + 1) === "{") {
		const var_end = text.indexOf("}", next_var);
		return first + removeBashVariables(text.slice(var_end + 1));
	}

	return first + removeBashVariables(text.slice(next_var + 2));
}

async function getLogo(os: string) {
	const name = OS_ALIAS[os] ?? os.toLowerCase();
	if (name.includes(" ")) return "[Logo not found]";

	const url = "https://raw.githubusercontent.com/fastfetch-cli/fastfetch/refs/"
		+ `tags/2.41.0/src/logo/ascii/${name}.txt`;

	const request = await fetch(url);

	if (!request.ok) return "[Logo not found]";

	const response = await request.text();
	const cleaned_text = removeBashVariables(response);
	const padded_text = padNewLine(cleaned_text, 23);

	return padded_text;
}

export default getLogo;
