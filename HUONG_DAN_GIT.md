# Hướng dẫn Push lên GitHub

## Bước 1: Tạo repository trên GitHub

1. Truy cập https://github.com
2. Đăng nhập vào tài khoản của bạn
3. Click nút **"New"** hoặc **"+"** ở góc trên bên phải
4. Chọn **"New repository"**
5. Đặt tên repository (ví dụ: `website-hoc-tap`)
6. Chọn **Public** hoặc **Private**
7. **KHÔNG** chọn "Initialize this repository with a README"
8. Click **"Create repository"**

## Bước 2: Kết nối với GitHub repository

Sau khi tạo repository, GitHub sẽ hiển thị các lệnh. Chạy các lệnh sau trong terminal:

```bash
# Thêm remote repository
git remote add origin https://github.com/TEN_TAI_KHOAN/TEN_REPOSITORY.git

# Đổi tên branch thành main (nếu cần)
git branch -M main

# Push code lên GitHub
git push -u origin main
```

**Thay thế:**
- `TEN_TAI_KHOAN` bằng username GitHub của bạn
- `TEN_REPOSITORY` bằng tên repository bạn vừa tạo

## Bước 3: Xác thực (nếu cần)

Nếu GitHub yêu cầu xác thực, bạn có 2 cách:

### Cách 1: Sử dụng Personal Access Token (Khuyến nghị)

1. Truy cập: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Đặt tên token (ví dụ: "Website Hoc Tap")
4. Chọn quyền: **repo** (full control)
5. Click **"Generate token"**
6. **Copy token** (chỉ hiển thị 1 lần!)
7. Khi push, dùng token thay cho password

### Cách 2: Sử dụng GitHub CLI

```bash
# Cài đặt GitHub CLI
# Windows: winget install --id GitHub.cli

# Đăng nhập
gh auth login

# Push code
git push -u origin main
```

## Bước 4: Push các thay đổi tiếp theo

Sau khi đã push lần đầu, mỗi khi có thay đổi:

```bash
# Xem trạng thái
git status

# Thêm file đã thay đổi
git add .

# Tạo commit với message mô tả
git commit -m "Mo ta thay doi"

# Push lên GitHub
git push
```

## Các lệnh Git hữu ích

```bash
# Xem lịch sử commit
git log --oneline

# Xem thay đổi chưa commit
git diff

# Xem remote repository
git remote -v

# Tạo branch mới
git checkout -b ten-branch-moi

# Chuyển branch
git checkout ten-branch

# Merge branch
git merge ten-branch

# Pull code mới nhất từ GitHub
git pull
```

## Lưu ý quan trọng

⚠️ **File không được push lên GitHub** (đã cấu hình trong `.gitignore`):
- `node_modules/` - Dependencies (sẽ cài lại bằng `npm install`)
- `*.db` - Database file
- `uploads/` - File upload (video, hình ảnh)
- `.env` - File cấu hình môi trường

✅ **Khi clone về máy khác:**
```bash
# Clone repository
git clone https://github.com/TEN_TAI_KHOAN/TEN_REPOSITORY.git

# Di chuyển vào thư mục
cd TEN_REPOSITORY

# Cài đặt dependencies
npm install

# Chạy server
npm start
```

## Ví dụ workflow hoàn chỉnh

```bash
# 1. Thay đổi code
# ... chỉnh sửa file ...

# 2. Xem file đã thay đổi
git status

# 3. Thêm file vào staging
git add .

# 4. Tạo commit
git commit -m "Them chuc nang tim kiem khoa hoc"

# 5. Push lên GitHub
git push

# 6. Xem trên GitHub
# Truy cập: https://github.com/TEN_TAI_KHOAN/TEN_REPOSITORY
```

## Xử lý lỗi thường gặp

### Lỗi: "failed to push some refs"
```bash
# Pull code mới nhất trước
git pull origin main

# Sau đó push lại
git push
```

### Lỗi: "Permission denied"
- Kiểm tra lại username/password hoặc token
- Đảm bảo bạn có quyền truy cập repository

### Lỗi: "Repository not found"
- Kiểm tra lại URL remote
- Đảm bảo repository đã được tạo trên GitHub

---

**Chúc bạn thành công! 🚀**
