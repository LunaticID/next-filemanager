import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false }
};

export default function handler(req, res) {
  const form = formidable({ multiples: false });

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: err });

    const file = files.file;
    const uploadPath = path.join(process.cwd(), "public", file.originalFilename);

    fs.renameSync(file.filepath, uploadPath);
    res.json({ message: "File uploaded successfully" });
  });
}
