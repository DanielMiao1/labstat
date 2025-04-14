async function getNodes() {
  const request = await fetch("/api/nodes");

  return await request.text();
}

export { getNodes };
