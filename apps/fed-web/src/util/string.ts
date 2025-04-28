function truncate(text: string, max_len: number): string {
	if (text.length <= max_len) {
		return text;
	}

	return text.slice(0, max_len) + "...";
}

function padNewLine(text: string, length: number): string {
	const lines = text.split("\n");
	if (lines.length >= length) return text;

	const pad_amount = length - lines.length;
	const top_amount = Math.floor(pad_amount / 2);
	const bottom_amount = Math.ceil(pad_amount / 2);

	const top = "\n".repeat(top_amount);
	const bottom = "\n".repeat(bottom_amount);

	return top + text + bottom;
}

function strip(text: string, match: string, index = 0): string {
	const char_count = match.length;
	let first, last;

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

export { padNewLine, strip, stripFirstLast, truncate };
