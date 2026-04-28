const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Tạo thư mục uploads nếu chưa có
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}
if (!fs.existsSync('uploads/videos')) {
  fs.mkdirSync('uploads/videos');
}
if (!fs.existsSync('uploads/images')) {
  fs.mkdirSync('uploads/images');
}

// Cấu hình multer để upload file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith('video/')) {
      cb(null, 'uploads/videos/');
    } else if (file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/images/');
    } else {
      cb(null, 'uploads/');
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Khởi tạo database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Lỗi kết nối database:', err);
  } else {
    console.log('Đã kết nối database');
    initDatabase();
  }
});

// Tạo bảng trong database
function initDatabase() {
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
  db.get("SELECT * FROM settings WHERE key = 'phone'", (err, row) => {
    if (!row) {
      db.run("INSERT INTO settings (key, value) VALUES ('phone', '0786985687')");
      db.run("INSERT INTO settings (key, value) VALUES ('email', 'huynhnhathunghhcl@gmail.com')");
      db.run("INSERT INTO sections (name, content) VALUES ('Giới thiệu giáo viên', 'Nội dung giới thiệu giáo viên...')");
      db.run("INSERT INTO sections (name, content) VALUES ('Nội dung khóa học', 'Nội dung về khóa học...')");
      db.run("INSERT INTO sections (name, content) VALUES ('Nhận xét', 'Nhận xét từ học viên...')");
      db.run("INSERT INTO sections (name, content) VALUES ('Liên hệ', 'Thông tin liên hệ...')");
    }
  });
}

// API Routes

// Lấy thông tin cài đặt
app.get('/api/settings', (req, res) => {
  db.all("SELECT * FROM settings", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const settings = {};
      rows.forEach(row => {
        settings[row.key] = row.value;
      });
      res.json(settings);
    }
  });
});

// Cập nhật cài đặt
app.put('/api/settings/:key', (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  
  db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", [key, value], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

// Lấy danh sách sections
app.get('/api/sections', (req, res) => {
  db.all("SELECT * FROM sections", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Lấy một section
app.get('/api/sections/:id', (req, res) => {
  db.get("SELECT * FROM sections WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  });
});

// Cập nhật section
app.put('/api/sections/:id', (req, res) => {
  const { content, video_url } = req.body;
  db.run("UPDATE sections SET content = ?, video_url = ? WHERE id = ?", 
    [content, video_url, req.params.id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

// Lấy danh sách khóa học
app.get('/api/courses', (req, res) => {
  db.all("SELECT * FROM courses ORDER BY created_at DESC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Thêm khóa học mới
app.post('/api/courses', (req, res) => {
  const { title, description, video_url } = req.body;
  db.run("INSERT INTO courses (title, description, video_url) VALUES (?, ?, ?)", 
    [title, description, video_url], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, success: true });
    }
  });
});

// Cập nhật khóa học
app.put('/api/courses/:id', (req, res) => {
  const { title, description, video_url } = req.body;
  db.run("UPDATE courses SET title = ?, description = ?, video_url = ? WHERE id = ?", 
    [title, description, video_url, req.params.id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

// Xóa khóa học
app.delete('/api/courses/:id', (req, res) => {
  db.run("DELETE FROM courses WHERE id = ?", [req.params.id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

// Lấy danh sách ảnh gallery
app.get('/api/gallery', (req, res) => {
  db.all("SELECT * FROM gallery", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Thêm ảnh vào gallery
app.post('/api/gallery', (req, res) => {
  const { image_url, caption } = req.body;
  db.run("INSERT INTO gallery (image_url, caption) VALUES (?, ?)", 
    [image_url, caption], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, success: true });
    }
  });
});

// Xóa ảnh khỏi gallery
app.delete('/api/gallery/:id', (req, res) => {
  db.run("DELETE FROM gallery WHERE id = ?", [req.params.id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

// Upload file
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Không có file được upload' });
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
