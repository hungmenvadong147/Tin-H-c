import express, { Request, Response, Application } from 'express';
import sqlite3 from 'sqlite3';
import multer, { StorageEngine } from 'multer';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';

const app: Application = express();
const PORT: number = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Tạo thư mục uploads nếu chưa có
const createUploadDirs = (): void => {
  const dirs = ['uploads', 'uploads/videos', 'uploads/images'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createUploadDirs();

// Cấu hình multer để upload file
const storage: StorageEngine = multer.diskStorage({
  destination: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, 'uploads/videos/');
    } else if (file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/images/');
    } else {
      cb(null, 'uploads/');
    }
  },
  filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Interfaces
interface Settings {
  [key: string]: string;
}

interface Section {
  id: number;
  name: string;
  content: string;
  video_url?: string;
}

interface Course {
  id: number;
  title: string;
  description?: string;
  video_url?: string;
  created_at: string;
}

interface GalleryImage {
  id: number;
  image_url: string;
  caption?: string;
}

interface SettingRow {
  key: string;
  value: string;
}

// Khởi tạo database
const db = new sqlite3.Database('./database.db', (err: Error | null) => {
  if (err) {
    console.error('Lỗi kết nối database:', err);
  } else {
    console.log('Đã kết nối database');
    initDatabase();
  }
});

// Tạo bảng trong database
const initDatabase = (): void => {
  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    content TEXT,
    video_url TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url TEXT NOT NULL,
    caption TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )`);

  // Thêm dữ liệu mặc định
  db.get("SELECT * FROM settings WHERE key = 'phone'", (_err: Error | null, row: SettingRow) => {
    if (!row) {
      db.run("INSERT INTO settings (key, value) VALUES ('phone', '0786985687')");
      db.run("INSERT INTO settings (key, value) VALUES ('email', 'huynhnhathunghhcl@gmail.com')");
      db.run("INSERT INTO sections (name, content) VALUES ('Giới thiệu giáo viên', 'Nội dung giới thiệu giáo viên...')");
      db.run("INSERT INTO sections (name, content) VALUES ('Nội dung khóa học', 'Nội dung về khóa học...')");
      db.run("INSERT INTO sections (name, content) VALUES ('Nhận xét', 'Nhận xét từ học viên...')");
      db.run("INSERT INTO sections (name, content) VALUES ('Liên hệ', 'Thông tin liên hệ...')");
    }
  });
};

// API Routes

// Lấy thông tin cài đặt
app.get('/api/settings', (_req: Request, res: Response): void => {
  db.all("SELECT * FROM settings", (err: Error | null, rows: SettingRow[]) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const settings: Settings = {};
      rows.forEach(row => {
        settings[row.key] = row.value;
      });
      res.json(settings);
    }
  });
});

// Cập nhật cài đặt
app.put('/api/settings/:key', (req: Request, res: Response): void => {
  const { key } = req.params;
  const { value } = req.body;
  
  db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", [key, value], (err: Error | null) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

// Lấy danh sách sections
app.get('/api/sections', (_req: Request, res: Response): void => {
  db.all("SELECT * FROM sections", (err: Error | null, rows: Section[]) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Lấy một section
app.get('/api/sections/:id', (req: Request, res: Response): void => {
  db.get("SELECT * FROM sections WHERE id = ?", [req.params.id], (err: Error | null, row: Section) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  });
});

// Cập nhật section
app.put('/api/sections/:id', (req: Request, res: Response): void => {
  const { content, video_url } = req.body;
  db.run("UPDATE sections SET content = ?, video_url = ? WHERE id = ?", 
    [content, video_url, req.params.id], (err: Error | null) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

// Lấy danh sách khóa học
app.get('/api/courses', (_req: Request, res: Response): void => {
  db.all("SELECT * FROM courses ORDER BY created_at DESC", (err: Error | null, rows: Course[]) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Thêm khóa học mới
app.post('/api/courses', (req: Request, res: Response): void => {
  const { title, description, video_url } = req.body;
  db.run("INSERT INTO courses (title, description, video_url) VALUES (?, ?, ?)", 
    [title, description, video_url], function(this: sqlite3.RunResult, err: Error | null) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, success: true });
    }
  });
});

// Cập nhật khóa học
app.put('/api/courses/:id', (req: Request, res: Response): void => {
  const { title, description, video_url } = req.body;
  db.run("UPDATE courses SET title = ?, description = ?, video_url = ? WHERE id = ?", 
    [title, description, video_url, req.params.id], (err: Error | null) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

// Xóa khóa học
app.delete('/api/courses/:id', (req: Request, res: Response): void => {
  db.run("DELETE FROM courses WHERE id = ?", [req.params.id], (err: Error | null) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

// Lấy danh sách ảnh gallery
app.get('/api/gallery', (_req: Request, res: Response): void => {
  db.all("SELECT * FROM gallery", (err: Error | null, rows: GalleryImage[]) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Thêm ảnh vào gallery
app.post('/api/gallery', (req: Request, res: Response): void => {
  const { image_url, caption } = req.body;
  db.run("INSERT INTO gallery (image_url, caption) VALUES (?, ?)", 
    [image_url, caption], function(this: sqlite3.RunResult, err: Error | null) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, success: true });
    }
  });
});

// Xóa ảnh khỏi gallery
app.delete('/api/gallery/:id', (req: Request, res: Response): void => {
  db.run("DELETE FROM gallery WHERE id = ?", [req.params.id], (err: Error | null) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

// Upload file
app.post('/api/upload', upload.single('file'), (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ error: 'Không có file được upload' });
    return;
  }
  res.json({ 
    success: true, 
    url: '/uploads/' + (req.file.mimetype.startsWith('video/') ? 'videos/' : 'images/') + req.file.filename 
  });
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

export default app;
