import { useState, useEffect } from "react";

export default function FileManager() {
  const [items, setItems] = useState([]);

  const loadFiles = async () => {
    const res = await fetch("/api/filemanager/list");
    const data = await res.json();
    setItems(data.items);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const upload = async (e) => {
    const file = e.target.files[0];
    const form = new FormData();
    form.append("file", file);

    await fetch("/api/filemanager/upload", {
      method: "POST",
      body: form
    });

    loadFiles();
  };

  const remove = async (name) => {
    await fetch("/api/filemanager/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: name })
    });
    loadFiles();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Next.js File Manager</h2>

      <input type="file" onChange={upload} />

      <ul>
        {items.map((item) => (
          <li key={item.name}>
            {item.name} {item.isDir ? "(dir)" : ""}
            {!item.isDir && (
              <button onClick={() => remove(item.name)} style={{ marginLeft: 10 }}>
                delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
