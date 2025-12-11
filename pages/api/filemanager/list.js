import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const dir = req.query.dir || ".";
  const basePath = path.join(process.cwd(), "public", dir);

  try {
    const items = fs.readdirSync(basePath).map(name => {
      const itemPath = path.join(basePath, name);
      return {
        name,
        isDir: fs.lstatSync(itemPath).isDirectory()
      };
    });

    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
