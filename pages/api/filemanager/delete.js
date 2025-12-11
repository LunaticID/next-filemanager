import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "POST only" });

  const { filename } = req.body;
  const target = path.join(process.cwd(), "public", filename);

  try {
    fs.unlinkSync(target);
    res.json({ message: "File deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
