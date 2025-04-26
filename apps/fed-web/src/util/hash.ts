function getHash() {
	const { hash } = document.location;
	if (hash.startsWith("#")) {
		return hash.slice(1);
	}

	return hash;
}

export default getHash;
