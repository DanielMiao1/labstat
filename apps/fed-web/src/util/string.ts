function truncate(text: string, max_len: number): string {
	if (text.length <= max_len) {
		return text;
	}

	return text.slice(0, max_len) + "...";
}

export { truncate };
