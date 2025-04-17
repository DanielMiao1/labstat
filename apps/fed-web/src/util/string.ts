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

export { padNewLine, truncate };
