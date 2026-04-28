# 🎓 Website Học Tập Cá Nhân - TypeScript Version

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-14+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

Website học tập cá nhân với giao diện quản trị đầy đủ, được xây dựng bằng **TypeScript** cho cả Backend và Frontend.

---

## ✨ Tính năng

### 🎨 Frontend
- ✅ Giao diện responsive (mobile, tablet, desktop)
- ✅ Header với thông tin liên hệ
- ✅ Menu hamburger
- ✅ 4 mục nội dung có thể chỉnh sửa
- ✅ Danh sách khóa học với video
- ✅ Gallery hình ảnh học trò

### ⚙️ Backend
- ✅ RESTful API với TypeScript
- ✅ Type-safe database operations
- ✅ Upload file (video, image)
- ✅ SQLite database
- ✅ CORS enabled

### 🔧 Admin Panel
- ✅ Quản lý thông tin liên hệ
- ✅ Chỉnh sửa nội dung menu (text + video)
- ✅ Thêm/sửa/xóa khóa học
- ✅ Quản lý thư viện ảnh

---

## 🚀 Quick Start

### 1. Cài đặt Dependencies
```bash
npm install
```

### 2. Build TypeScript
```bash
# Build backend
npm run build

# Build frontend
npm run build:frontend
```

### 3. Chạy Server
```bash
npm start
```

### 4. Mở Browser
- **Trang chủ:** http://localhost:3000
- **Quản trị:** http://localhost:3000/admin.html

---

## 📦 Tech Stack

### Backend
- **TypeScript** 5.3+
- **Node.js** + Express
- **SQLite3** database
- **Multer** (file upload)
- **CORS** + Body-parser

### Frontend
- **TypeScript** 5.3+
- **HTML5** + CSS3
- **Vanilla JavaScript** (compiled from TS)
- **Responsive Design**

### Development
- **TypeScript Compiler**
- **Nodemon** (auto-restart)
- **Type Definitions** (@types/*)

---

## 📁 Cấu trúc Dự án

```
project/
│
├── src/                          # Backend TypeScript
│   ├── server.ts                # Main server
│   └── types/
│       └── index.ts             # Type definitions
│
├── dist/                         # Compiled backend
│   └── server.js                # (auto-generated)
│
├── public/
│   ├── ts/                      # Frontend TypeScript
│   │   ├── script.ts           # Main page
│   │   └── admin.ts            # Admin page
│   │
│   ├── js/                      # Compiled frontend
│   │   ├── script.js           # (auto-generated)
│   │   └── admin.js            # (auto-generated)
│   │
│   ├── index.html
│   ├── admin.html
│   ├── styles.css
│   └── admin.css
│
├── uploads/                      # File uploads
│   ├── videos/
│   └── images/
│
├── tsconfig.json                # Backend TS config
├── tsconfig.frontend.json       # Frontend TS config
├── package.json
├── database.db                  # SQLite database
│
└── 📚 Documentation/
    ├── README.md                # Main README
    ├── TYPESCRIPT_MIGRATION.md  # Migration guide
    ├── SETUP_TYPESCRIPT.md      # Setup guide
    ├── HUONG_DAN_CAI_DAT.md    # Installation (Vietnamese)
    ├── HUONG_DAN_GIT.md        # Git guide (Vietnamese)
    ├── BAT_DAU_NHANH.md        # Quick start (Vietnamese)
    ├── TINH_NANG.md            # Features list (Vietnamese)
    ├── INDEX.md                 # Documentation index
    └── START_HERE.md            # Start here
```

---

## 🔨 Scripts

```bash
# Build
npm run build              # Build backend (src/ → dist/)
npm run build:frontend     # Build frontend (public/ts/ → public/js/)

# Run
npm start                  # Build & run server
npm run dev                # Development mode (auto-restart)

# Watch
npm run watch:frontend     # Auto-compile frontend on change
```

---

## 🎯 Development Workflow

### Backend Development
```bash
# Edit src/server.ts
npm run dev  # Auto-restart on changes
```

### Frontend Development
```bash
# Terminal 1: Watch TypeScript
npm run watch:frontend

# Terminal 2: Run server
npm run dev

# Edit public/ts/script.ts or public/ts/admin.ts
# Files auto-compile to public/js/
```

---

## 📝 Type Definitions

### Backend Types
```typescript
interface Course {
  id: number;
  title: string;
  description?: string;
  video_url?: string;
  created_at: string;
}

interface Section {
  id: number;
  name: string;
  content: string;
  video_url?: string;
}

interface GalleryImage {
  id: number;
  image_url: string;
  caption?: string;
}
```

### API Routes (Type-safe)
```typescript
app.get('/api/courses', (req: Request, res: Response): void => {
  // Type-safe implementation
});

app.post('/api/courses', (req: Request, res: Response): void => {
  const { title, description, video_url } = req.body;
  // TypeScript ensures type safety
});
```

---

## 🌐 API Endpoints

### Settings
- `GET /api/settings` - Lấy cài đặt
- `PUT /api/settings/:key` - Cập nhật cài đặt

### Sections
- `GET /api/sections` - Lấy tất cả sections
- `GET /api/sections/:id` - Lấy một section
- `PUT /api/sections/:id` - Cập nhật section

### Courses
- `GET /api/courses` - Lấy danh sách khóa học
- `POST /api/courses` - Thêm khóa học
- `PUT /api/courses/:id` - Cập nhật khóa học
- `DELETE /api/courses/:id` - Xóa khóa học

### Gallery
- `GET /api/gallery` - Lấy danh sách ảnh
- `POST /api/gallery` - Thêm ảnh
- `DELETE /api/gallery/:id` - Xóa ảnh

### Upload
- `POST /api/upload` - Upload file

---

## 🎓 Lợi ích của TypeScript

### 1. Type Safety
```typescript
// Compile-time error detection
const course: Course = {
  id: 1,
  title: 123  // ❌ Error: Type 'number' is not assignable to type 'string'
};
```

### 2. Better IDE Support
- ✅ Autocomplete
- ✅ IntelliSense
- ✅ Refactoring tools
- ✅ Error detection

### 3. Self-documenting Code
```typescript
async function addCourse(
  title: string, 
  description: string, 
  video_url?: string
): Promise<void> {
  // Parameters and return type are clear
}
```

### 4. Fewer Runtime Errors
- Type checking trước khi chạy
- Catch errors sớm hơn
- Code quality tốt hơn

---

## 📚 Tài liệu

### Tiếng Việt
- **[START_HERE.md](START_HERE.md)** - Bắt đầu tại đây
- **[BAT_DAU_NHANH.md](BAT_DAU_NHANH.md)** - Chạy nhanh 5 phút
- **[SETUP_TYPESCRIPT.md](SETUP_TYPESCRIPT.md)** - Setup TypeScript
- **[TYPESCRIPT_MIGRATION.md](TYPESCRIPT_MIGRATION.md)** - Migration guide
- **[HUONG_DAN_CAI_DAT.md](HUONG_DAN_CAI_DAT.md)** - Hướng dẫn cài đặt
- **[HUONG_DAN_GIT.md](HUONG_DAN_GIT.md)** - Hướng dẫn Git
- **[TINH_NANG.md](TINH_NANG.md)** - Danh sách tính năng
- **[INDEX.md](INDEX.md)** - Tổng hợp tài liệu

### English
- **[README.md](README.md)** - Main documentation

---

## 🐛 Troubleshooting

### "npm: command not found"
```bash
# Cài đặt Node.js từ https://nodejs.org/
# Restart terminal
npm --version
```

### "Cannot find module 'typescript'"
```bash
npm install
```

### TypeScript compilation failed
```bash
# Xem error message
npm run build

# Fix syntax errors trong file .ts
# Build lại
```

### Frontend không hoạt động
```bash
# Build lại frontend
npm run build:frontend

# Kiểm tra file đã được tạo
ls public/js/
```

---

## 🔐 Bảo mật

⚠️ **Lưu ý:** Đây là phiên bản demo, chưa có:
- Authentication/Authorization
- Input validation
- Rate limiting
- CSRF protection

**Để production:**
1. Thêm authentication (JWT, session)
2. Validate input data
3. Sử dụng HTTPS
4. Thêm rate limiting
5. Implement CSRF protection

---

## 🚀 Deployment

### Build cho Production
```bash
npm run build
npm run build:frontend
```

### Deploy lên:
- **Heroku** (free tier)
- **Vercel** (free tier)
- **Railway** (free tier)
- **DigitalOcean** (paid)
- **AWS** (paid)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

ISC License

---

## 📞 Liên hệ

- **Email:** huynhnhathunghhcl@gmail.com
- **Phone:** 0786985687
- **GitHub:** https://github.com/hungmenvadong147/Tin-H-c

---

## 🙏 Acknowledgments

- TypeScript team
- Express.js
- SQLite
- Node.js community

---

## 📊 Stats

- **Lines of Code:** 2,000+
- **TypeScript Files:** 5
- **Type Definitions:** 10+
- **API Endpoints:** 15+
- **Documentation Files:** 10+

---

**Made with ❤️ and TypeScript**

*Version 2.0.0 - TypeScript Edition*
