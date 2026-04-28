# 📚 Hướng dẫn Cài đặt và Chạy Website Học Tập

## 📋 Yêu cầu hệ thống

Trước khi bắt đầu, đảm bảo máy tính của bạn đã cài đặt:

- **Node.js** (phiên bản 14 trở lên) - [Tải tại đây](https://nodejs.org/)
- **Git** - [Tải tại đây](https://git-scm.com/)
- Trình duyệt web hiện đại (Chrome, Firefox, Edge...)

### Kiểm tra cài đặt

Mở terminal/command prompt và chạy:

```bash
node --version
npm --version
git --version
```

Nếu hiển thị số phiên bản → Đã cài đặt thành công ✅

## 🚀 Cài đặt lần đầu

### Bước 1: Tải code về máy

**Nếu đã có trên GitHub:**
```bash
git clone https://github.com/TEN_TAI_KHOAN/TEN_REPOSITORY.git
cd TEN_REPOSITORY
```

**Nếu đang ở thư mục dự án:**
```bash
# Bỏ qua bước này, bạn đã có code rồi
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

Lệnh này sẽ tải và cài đặt tất cả các thư viện cần thiết:
- express (web framework)
- sqlite3 (database)
- multer (upload file)
- body-parser (xử lý dữ liệu)
- cors (cho phép cross-origin requests)

⏱️ Quá trình này mất khoảng 1-2 phút.

### Bước 3: Chạy server

```bash
npm start
```

Hoặc chạy ở chế độ development (tự động restart khi có thay đổi):

```bash
npm run dev
```

Khi thấy thông báo:
```
Server đang chạy tại http://localhost:3000
Đã kết nối database
```

→ Server đã chạy thành công! 🎉

### Bước 4: Truy cập website

Mở trình duyệt và truy cập:

- **Trang chủ:** http://localhost:3000
- **Trang quản trị:** http://localhost:3000/admin.html

## 📱 Sử dụng Website

### Trang chủ (index.html)

1. **Header:** Hiển thị số điện thoại và email
2. **Menu:** Click vào icon 3 gạch để mở menu
3. **Nội dung:** Cuộn xuống để xem các phần:
   - Giới thiệu giáo viên
   - Nội dung khóa học
   - Danh sách các khóa học
   - Nhận xét
   - Liên hệ
   - Thư viện ảnh học trò

### Trang quản trị (admin.html)

#### Tab 1: Cài đặt
- Thay đổi số điện thoại
- Thay đổi email
- Click **"💾 Lưu cài đặt"**

#### Tab 2: Nội dung Menu
Chỉnh sửa 4 mục menu:
1. **Giới thiệu giáo viên**
2. **Nội dung khóa học**
3. **Nhận xét**
4. **Liên hệ**

Mỗi mục có thể:
- Sửa văn bản
- Upload video hoặc nhập URL video
- Click **"💾 Lưu"** để lưu thay đổi

#### Tab 3: Khóa học
- Click **"➕ Thêm khóa học mới"**
- Nhập:
  - Tiêu đề khóa học
  - Mô tả
  - Upload video hoặc nhập URL
- Click **"💾 Lưu khóa học"**

Quản lý khóa học:
- **✏️ Sửa:** Chỉnh sửa khóa học (đang phát triển)
- **🗑️ Xóa:** Xóa khóa học

#### Tab 4: Thư viện ảnh
- Chọn file ảnh
- Nhập chú thích (tùy chọn)
- Click **"➕ Thêm ảnh"**
- Click **"×"** trên ảnh để xóa

## 🔧 Cấu trúc dự án

```
website-hoc-tap/
│
├── public/                    # Frontend
│   ├── index.html            # Trang chủ
│   ├── admin.html            # Trang quản trị
│   ├── styles.css            # CSS trang chủ
│   ├── admin.css             # CSS quản trị
│   ├── script.js             # JS trang chủ
│   └── admin.js              # JS quản trị
│
├── uploads/                   # File upload (tự động tạo)
│   ├── videos/               # Video files
│   └── images/               # Image files
│
├── server.js                 # Backend server
├── database.db               # SQLite database (tự động tạo)
├── package.json              # Dependencies
├── .gitignore                # Git ignore rules
├── README.md                 # Tài liệu chính
├── HUONG_DAN_CAI_DAT.md     # File này
└── HUONG_DAN_GIT.md         # Hướng dẫn Git
```

## 🗄️ Database

Database SQLite sẽ tự động được tạo khi chạy server lần đầu với:

**4 bảng:**
1. **settings** - Lưu cài đặt (phone, email)
2. **sections** - Lưu nội dung 4 mục menu
3. **courses** - Lưu danh sách khóa học
4. **gallery** - Lưu thư viện ảnh

**Dữ liệu mặc định:**
- Phone: 0786985687
- Email: huynhnhathunghhcl@gmail.com
- 4 sections với nội dung mẫu

## 🌐 API Endpoints

Server cung cấp các API sau:

### Settings
- `GET /api/settings` - Lấy cài đặt
- `PUT /api/settings/:key` - Cập nhật cài đặt

### Sections
- `GET /api/sections` - Lấy tất cả sections
- `GET /api/sections/:id` - Lấy 1 section
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

## ❓ Xử lý lỗi thường gặp

### Lỗi: "Cannot find module"
```bash
# Xóa node_modules và cài lại
rm -rf node_modules
npm install
```

### Lỗi: "Port 3000 is already in use"
```bash
# Đổi port trong server.js
const PORT = 3001; // Thay 3000 thành 3001
```

Hoặc tắt ứng dụng đang dùng port 3000.

### Lỗi: "EACCES: permission denied"
- Chạy terminal với quyền Administrator (Windows)
- Hoặc dùng `sudo` (Mac/Linux)

### Database bị lỗi
```bash
# Xóa database và tạo lại
rm database.db
npm start
```

### Upload file không hoạt động
- Kiểm tra thư mục `uploads/` đã được tạo chưa
- Kiểm tra quyền ghi file

## 🔒 Bảo mật

⚠️ **Lưu ý quan trọng:**

Đây là phiên bản demo, chưa có:
- Xác thực đăng nhập
- Mã hóa mật khẩu
- Bảo vệ CSRF
- Rate limiting

**Để sử dụng production:**
1. Thêm xác thực (JWT, session)
2. Thêm validation dữ liệu
3. Sử dụng HTTPS
4. Giới hạn kích thước file upload
5. Thêm captcha cho form

## 📱 Responsive Design

Website tự động điều chỉnh giao diện cho:
- 📱 Mobile (< 480px)
- 📱 Tablet (480px - 768px)
- 💻 Desktop (> 768px)

## 🎨 Tùy chỉnh giao diện

### Đổi màu chủ đạo

Mở `public/styles.css` và tìm:

```css
/* Màu header */
.header {
    background-color: #2c3e50; /* Đổi màu này */
}

/* Màu menu */
.nav-menu {
    background-color: #34495e; /* Đổi màu này */
}
```

### Đổi font chữ

```css
body {
    font-family: 'Arial', sans-serif; /* Đổi font này */
}
```

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra console trong trình duyệt (F12)
2. Kiểm tra terminal xem có lỗi không
3. Đọc lại hướng dẫn
4. Liên hệ: huynhnhathunghhcl@gmail.com

## 🚀 Triển khai lên Internet

Để đưa website lên Internet, bạn có thể dùng:

1. **Heroku** (miễn phí)
2. **Vercel** (miễn phí)
3. **Railway** (miễn phí)
4. **DigitalOcean** (trả phí)
5. **AWS** (trả phí)

Xem hướng dẫn chi tiết trong file `DEPLOY.md` (sẽ tạo sau).

---

**Chúc bạn thành công! 🎓✨**

Nếu có câu hỏi, đừng ngại liên hệ!
