# ⚡ Bắt đầu nhanh - 5 phút

## 🎯 Chạy website ngay lập tức

### 1️⃣ Cài đặt dependencies (chỉ làm 1 lần)
```bash
npm install
```

### 2️⃣ Chạy server
```bash
npm start
```

### 3️⃣ Mở trình duyệt
- **Trang chủ:** http://localhost:3000
- **Quản trị:** http://localhost:3000/admin.html

---

## 📝 Các lệnh thường dùng

### Chạy server
```bash
npm start              # Chạy bình thường
npm run dev            # Chạy với auto-restart
```

### Dừng server
Nhấn `Ctrl + C` trong terminal

### Git commands
```bash
git status             # Xem thay đổi
git add .              # Thêm tất cả file
git commit -m "..."    # Tạo commit
git push               # Push lên GitHub
```

---

## 🎨 Thay đổi nội dung

### Cách 1: Qua giao diện quản trị (Khuyến nghị)
1. Mở http://localhost:3000/admin.html
2. Chọn tab tương ứng
3. Chỉnh sửa và lưu

### Cách 2: Sửa trực tiếp code
- **Thông tin liên hệ:** Sửa trong database hoặc qua admin
- **Giao diện:** Sửa file `.css` trong thư mục `public/`
- **Nội dung:** Sửa qua trang admin

---

## 📂 File quan trọng

| File | Mô tả |
|------|-------|
| `server.js` | Backend server |
| `public/index.html` | Trang chủ |
| `public/admin.html` | Trang quản trị |
| `public/styles.css` | CSS trang chủ |
| `public/admin.css` | CSS quản trị |
| `database.db` | Database (tự động tạo) |

---

## 🔥 Checklist sau khi cài đặt

- [ ] Chạy `npm install` thành công
- [ ] Server chạy được (http://localhost:3000)
- [ ] Trang chủ hiển thị đúng
- [ ] Trang admin mở được
- [ ] Thử thêm 1 khóa học
- [ ] Thử upload 1 ảnh
- [ ] Thử thay đổi thông tin liên hệ
- [ ] Kiểm tra responsive trên mobile

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
const PORT = 3001; // Thay 3000 thành 3001
```

### Database lỗi
```bash
rm database.db
npm start
```

---

## 📚 Tài liệu đầy đủ

- **Cài đặt chi tiết:** `HUONG_DAN_CAI_DAT.md`
- **Hướng dẫn Git:** `HUONG_DAN_GIT.md`
- **README:** `README.md`

---

## 🚀 Push lên GitHub (3 bước)

### 1. Tạo repository trên GitHub
- Truy cập https://github.com/new
- Tạo repository mới

### 2. Kết nối và push
```bash
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### 3. Xem trên GitHub
Truy cập: https://github.com/USERNAME/REPO_NAME

---

## 💡 Tips

✅ **Luôn commit sau mỗi thay đổi quan trọng:**
```bash
git add .
git commit -m "Mo ta thay doi"
git push
```

✅ **Backup database thường xuyên:**
```bash
cp database.db database.backup.db
```

✅ **Test trên nhiều trình duyệt:**
- Chrome
- Firefox
- Edge
- Safari (nếu có Mac)

---

**Bắt đầu ngay! 🎉**

```bash
npm install && npm start
```
