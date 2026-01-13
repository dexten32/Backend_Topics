async function fetchingUser() {
  const raw = await fetch("https://jsonplaceholder.typicode.com/users");
  if(!raw.ok) {
    throw new Error("Failed to fetch users.")
  }
  const raw_json = await raw.json();
  return raw_json.map((u) => ({
    id: u.id,
    name: u.name,
  }));
}

export default fetchingUser;
