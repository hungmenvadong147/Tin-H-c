# Website Học Tập Cá Nhân

Website học tập cá nhân với giao diện quản trị đầy đủ, cho phép quản lý nội dung, khóa học, và hình ảnh.

## Tính năng

✅ **Giao diện người dùng:**
- Thiết kế đơn giản, hiện đại, responsive
- Header với thông tin liên hệ
- Menu hamburger với các mục: Giới thiệu, Nội dung khóa học, Nhận xét, Liên hệ
- Hiển thị danh sách khóa học với video
- Gallery hình ảnh học trò

✅ **Giao diện quản trị:**
- Quản lý thông tin liên hệ (số điện thoại, email)
- Chỉnh sửa nội dung các mục menu (văn bản + video)
- Thêm/sửa/xóa khóa học
- Quản lý thư viện ảnh

✅ **Backend:**
- Node.js + Express
- SQLite database
- Upload file (video, hình ảnh)
- RESTful API

## Cài đặt

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy server

```bash
npm start
```

Hoặc chạy ở chế độ development (tự động restart khi có thay đổi):

```bash
npm run dev
```

### 3. Truy cập website

- **Trang chủ:** http://localhost:3000
- **Trang quản trị:** http://localhost:3000/admin.html

## Cấu trúc thư mục

```
.
├── public/                 # Frontend files
│   ├── index.html         # Trang chủ
│   ├── admin.html         # Trang quản trị
│   ├── styles.css         # CSS trang chủ
│   ├── admin.css          # CSS trang quản trị
│   ├── script.js          # JavaScript trang chủ
│   └── admin.js           # JavaScript trang quản trị
├── uploads/               # Thư mục lưu file upload
│   ├── videos/           # Video files
│   └── images/           # Image files
├── server.js             # Backend server
├── database.db           # SQLite database
├── package.json          # Dependencies
└── README.md            # Tài liệu này
```

## API Endpoints

### Settings
- `GET /api/settings` - Lấy tất cả cài đặt
- `PUT /api/settings/:key` - Cập nhật một cài đặt

### Sections (Menu items)
- `GET /api/sections` - Lấy tất cả sections
- `GET /api/sections/:id` - Lấy một section
- `PUT /api/sections/:id` - Cập nhật section

### Courses
- `GET /api/courses` - Lấy tất cả khóa học
- `POST /api/courses` - Thêm khóa học mới
- `PUT /api/courses/:id` - Cập nhật khóa học
- `DELETE /api/courses/:id` - Xóa khóa học

### Gallery
- `GET /api/gallery` - Lấy tất cả ảnh
- `POST /api/gallery` - Thêm ảnh mới
- `DELETE /api/gallery/:id` - Xóa ảnh

### Upload
- `POST /api/upload` - Upload file (video/image)

## Hướng dẫn sử dụng

### Quản trị website

1. Truy cập http://localhost:3000/admin.html
2. Chọn tab tương ứng để quản lý:
   - **Cài đặt:** Thay đổi số điện thoại và email
   - **Nội dung Menu:** Chỉnh sửa nội dung các mục menu
   - **Khóa học:** Thêm/sửa/xóa khóa học
   - **Thư viện ảnh:** Quản lý hình ảnh

### Upload file

- **Video:** Chọn file video hoặc nhập URL video
- **Hình ảnh:** Chọn file ảnh từ máy tính

## Công nghệ sử dụng

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **Upload:** Multer
- **CORS:** Enabled

## Lưu ý

- Database sẽ tự động được tạo khi chạy server lần đầu
- Thư mục `uploads/` sẽ tự động được tạo để lưu file
- File `.gitignore` đã được cấu hình để không commit database và uploads lên Git

## Phát triển tiếp

Các tính năng có thể thêm:
- [ ] Xác thực đăng nhập cho trang quản trị
- [ ] Phân quyền người dùng
- [ ] Tìm kiếm khóa học
- [ ] Bình luận và đánh giá
- [ ] Thống kê truy cập
- [ ] Tối ưu hóa SEO

## Liên hệ

- **Số điện thoại:** 0786985687
- **Email:** huynhnhathunghhcl@gmail.com

---

Made with ❤️ for education
