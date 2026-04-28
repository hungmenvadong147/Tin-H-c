# 🎯 BẮT ĐẦU TẠI ĐÂY!

## 👋 Chào mừng đến với Website Học Tập Cá Nhân!

Đây là dự án **hoàn chỉnh** với frontend, backend, database và tài liệu đầy đủ.

---

## ⚡ Chạy ngay trong 3 bước

### 1️⃣ Cài đặt
```bash
npm install
```

### 2️⃣ Chạy
```bash
npm start
```

### 3️⃣ Mở trình duyệt
- Trang chủ: http://localhost:3000
- Quản trị: http://localhost:3000/admin.html

---

## 📚 Đọc tài liệu gì?

### 🚀 Muốn bắt đầu ngay?
👉 **[BAT_DAU_NHANH.md](BAT_DAU_NHANH.md)** (5 phút)

### 📖 Muốn hiểu chi tiết?
👉 **[HUONG_DAN_CAI_DAT.md](HUONG_DAN_CAI_DAT.md)** (15 phút)

### 🔧 Muốn push lên GitHub?
👉 **[HUONG_DAN_GIT.md](HUONG_DAN_GIT.md)** (10 phút)

### 📋 Muốn xem tính năng?
👉 **[TINH_NANG.md](TINH_NANG.md)** (5 phút)

### 📚 Muốn xem tổng quan?
👉 **[INDEX.md](INDEX.md)** (Tổng hợp tất cả)

### 📄 Muốn xem README?
👉 **[README.md](README.md)** (Tài liệu chính)

---

## 🎯 Bạn muốn làm gì?

### ✅ Chạy website
```bash
npm start
```
Mở: http://localhost:3000

### ✅ Thêm khóa học
1. Mở: http://localhost:3000/admin.html
2. Tab "Khóa học"
3. Click "➕ Thêm khóa học mới"

### ✅ Thay đổi thông tin liên hệ
1. Mở: http://localhost:3000/admin.html
2. Tab "Cài đặt"
3. Sửa phone/email
4. Click "💾 Lưu cài đặt"

### ✅ Upload ảnh
1. Mở: http://localhost:3000/admin.html
2. Tab "Thư viện ảnh"
3. Chọn ảnh
4. Click "➕ Thêm ảnh"

### ✅ Push lên GitHub
```bash
# Tạo repo trên GitHub trước
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```

### ✅ Xem thay đổi
```bash
git status
```

### ✅ Commit thay đổi
```bash
git add .
git commit -m "Mo ta thay doi"
git push
```

---

## 🗂️ Cấu trúc file

```
📁 Dự án
├── 📁 public/          → Frontend (HTML, CSS, JS)
├── 📄 server.js        → Backend (Node.js)
├── 📄 package.json     → Dependencies
├── 📄 database.db      → Database (tự động tạo)
└── 📚 Tài liệu/        → 6 file hướng dẫn
```

---

## ✅ Checklist

- [ ] Đã chạy `npm install`
- [ ] Server chạy được
- [ ] Trang chủ mở được
- [ ] Trang admin mở được
- [ ] Đã thử thêm khóa học
- [ ] Đã thử upload ảnh
- [ ] Đã đọc tài liệu
- [ ] Đã push lên GitHub

---

## 🆘 Gặp lỗi?

### "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### "Port 3000 already in use"
Đổi port trong `server.js`:
```javascript
const PORT = 3001;
```

### Database lỗi
```bash
rm database.db
npm start
```

---

## 📞 Liên hệ

- **Email:** huynhnhathunghhcl@gmail.com
- **Phone:** 0786985687

---

## 🎉 Bắt đầu ngay!

```bash
npm install && npm start
```

Sau đó mở: **http://localhost:3000**

---

**Chúc bạn thành công! 🚀**

*Đọc [INDEX.md](INDEX.md) để xem tổng quan đầy đủ*
