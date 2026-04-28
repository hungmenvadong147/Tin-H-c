# 🚀 Hướng dẫn Setup TypeScript

## ⚠️ Yêu cầu

Đảm bảo đã cài đặt:
- **Node.js** (v14 trở lên) - [Download](https://nodejs.org/)
- **npm** (đi kèm với Node.js)

### Kiểm tra cài đặt

```bash
node --version
npm --version
```

Nếu chưa có, tải và cài đặt Node.js từ: https://nodejs.org/

---

## 📦 Bước 1: Cài đặt Dependencies

```bash
npm install
```

Lệnh này sẽ cài đặt:
- TypeScript compiler
- Type definitions (@types/*)
- Tất cả dependencies cần thiết

⏱️ Quá trình này mất khoảng 2-3 phút.

---

## 🔨 Bước 2: Build TypeScript

### Build Backend
```bash
npm run build
```

Compile `src/**/*.ts` → `dist/**/*.js`

### Build Frontend
```bash
npm run build:frontend
```

Compile `public/ts/**/*.ts` → `public/js/**/*.js`

### Build tất cả
```bash
npm run build && npm run build:frontend
```

---

## ▶️ Bước 3: Chạy Server

```bash
npm start
```

Server sẽ chạy tại: http://localhost:3000

---

## 🔄 Development Workflow

### Option 1: Manual Build
```bash
# Terminal 1: Build frontend khi có thay đổi
npm run watch:frontend

# Terminal 2: Run server
npm run dev
```

### Option 2: Build và Run
```bash
npm run build
npm run build:frontend
npm start
```

---

## 📝 Chỉnh sửa Code

### Backend (Server)
1. Edit file trong `src/`
2. Run `npm run build`
3. Run `npm start`

### Frontend (Client)
1. Edit file trong `public/ts/`
2. Run `npm run build:frontend`
3. Refresh browser

---

## 🐛 Xử lý lỗi

### Lỗi: "npm: command not found"
**Giải pháp:**
1. Cài đặt Node.js từ https://nodejs.org/
2. Restart terminal
3. Chạy lại `npm install`

### Lỗi: "Cannot find module 'typescript'"
**Giải pháp:**
```bash
npm install
```

### Lỗi: "tsc: command not found"
**Giải pháp:**
```bash
npm install -g typescript
# Hoặc dùng npx
npx tsc --version
```

### Lỗi: TypeScript compilation failed
**Giải pháp:**
1. Đọc error message trong terminal
2. Fix syntax errors trong file .ts
3. Run build lại

### Lỗi: "Port 3000 already in use"
**Giải pháp:**
1. Tắt ứng dụng đang dùng port 3000
2. Hoặc đổi port trong `src/server.ts`:
```typescript
const PORT: number = 3001; // Đổi thành 3001
```

---

## 📂 Cấu trúc File

```
project/
│
├── src/                    # Backend TypeScript
│   ├── server.ts          # ✏️ Edit this
│   └── types/
│       └── index.ts       # ✏️ Edit this
│
├── dist/                   # ⚙️ Auto-generated (don't edit)
│   └── server.js
│
├── public/
│   ├── ts/                # Frontend TypeScript
│   │   ├── script.ts     # ✏️ Edit this
│   │   └── admin.ts      # ✏️ Edit this
│   │
│   └── js/                # ⚙️ Auto-generated (don't edit)
│       ├── script.js
│       └── admin.js
│
├── tsconfig.json          # Backend TS config
├── tsconfig.frontend.json # Frontend TS config
└── package.json
```

**Lưu ý:**
- ✏️ Chỉ edit file `.ts`
- ⚙️ File `.js` được tạo tự động, không edit trực tiếp

---

## ✅ Checklist Setup

- [ ] Đã cài Node.js
- [ ] Đã chạy `npm install`
- [ ] Đã chạy `npm run build`
- [ ] Đã chạy `npm run build:frontend`
- [ ] Server chạy được (`npm start`)
- [ ] Trang chủ mở được (http://localhost:3000)
- [ ] Trang admin mở được (http://localhost:3000/admin.html)
- [ ] Tất cả tính năng hoạt động

---

## 🎯 Quick Start (TL;DR)

```bash
# 1. Cài đặt
npm install

# 2. Build
npm run build
npm run build:frontend

# 3. Run
npm start

# 4. Mở browser
# http://localhost:3000
```

---

## 📚 Tài liệu thêm

- **TypeScript Migration:** `TYPESCRIPT_MIGRATION.md`
- **Cài đặt chi tiết:** `HUONG_DAN_CAI_DAT.md`
- **Bắt đầu nhanh:** `BAT_DAU_NHANH.md`
- **README:** `README.md`

---

## 💡 Tips

### Auto-compile Frontend
```bash
npm run watch:frontend
```
File TypeScript sẽ tự động compile khi save.

### Check TypeScript Errors
```bash
npx tsc --noEmit
```
Kiểm tra lỗi mà không compile.

### Clean Build
```bash
# Xóa compiled files
rm -rf dist/ public/js/

# Build lại
npm run build
npm run build:frontend
```

---

## 🔗 Links hữu ích

- **Node.js:** https://nodejs.org/
- **TypeScript:** https://www.typescriptlang.org/
- **npm:** https://www.npmjs.com/

---

**Nếu gặp vấn đề, đọc `TYPESCRIPT_MIGRATION.md` để biết thêm chi tiết!**
