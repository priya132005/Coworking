import fs from 'fs';
import path from 'path';
import multer from 'multer';

// Define the upload directory path
const uploadDir = path.join(process.cwd(), 'uploads');

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage settings for multer
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueName = `${base}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

// Define file type filter
const fileFilter = (_req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedTypes = ['.jpg', '.jpeg', '.webp', '.png', '.mp4'];

  if (!allowedTypes.includes(ext)) {
    cb(new Error(`Unsupported file type: ${ext}`), false);
  } else {
    cb(null, true);
  }
};

// Initialize and export the multer upload middleware
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter
});

export default upload;
