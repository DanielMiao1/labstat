function strip(text: string, match: string, index = 0): string {
	const char_count = match.length;
	let first, last

	if (index < 0) {
		const end_index = index + text.length;
		const start_index = end_index - char_count + 1;
		const substr = text.slice(start_index, end_index + 1);

		if (substr !== match) return text;

		first = text.slice(0, start_index);
		last = text.slice(end_index + 1);
	} else {
		const end_index = index + char_count;
		const substr = text.slice(index, end_index);

		if (substr !== match) return text;

		first = text.slice(0, index);
		last = text.slice(end_index);
	}

	return first + last;
}

function stripFirstLast(text: string, match: string): string {
	return strip(strip(text, match), match, -1);
}

function stripSingleQuotes(text: string): string {
	return stripFirstLast(text, "'");
}

function stripDoubleQuotes(text: string): string {
	return stripFirstLast(text, "\"");
}

function stripAllQuotes(text: string): string {
	return stripSingleQuotes(stripDoubleQuotes(text));
}

export {
	strip,
	stripAllQuotes,
	stripDoubleQuotes,
	stripFirstLast,
	stripSingleQuotes
};
