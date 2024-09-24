import multer from "multer";
import path from "path";

// Configure Multer to store files locally
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const uploadWithMulter = async (files: any[]): Promise<string[] | string> => {
  const urls = files.map((file) => `/uploads/${file.filename}`);
  return urls.length === 1 ? urls[0] : urls;
};
