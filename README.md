# CTK46 - Lab 01: Tổng quan & Thiết lập môi trường

Đây là repository lưu trữ kết quả thực hành **Bài lab 1: Tổng quan & Thiết lập môi trường phát triển**, thuộc môn học Các công nghệ mới trong phát triển phần mềm.

## 🚀 Mục tiêu đã hoàn thành

Trong dự án này, các công việc sau đã được thực hiện:

- **Thiết lập môi trường:** Cấu hình thành công Node.js, Git, và Visual Studio Code (với các extension chuẩn).
- **Git Workflow:** Thực hành tạo nhánh, merge code và giải quyết thành công Merge Conflict.
- **Tích hợp AI:** Trải nghiệm viết code với GitHub Copilot, sử dụng Copilot CLI và Gemini CLI trực tiếp trên Terminal.
- **Next.js:** Khởi tạo thành công dự án web hiện đại với Next.js (App Router) và Tailwind CSS.

## 🛠️ Công nghệ sử dụng

- **Core:** Node.js, Git.
- **Framework & Styling:** Next.js (React), Tailwind CSS, TypeScript.
- **AI Tools:** GitHub Copilot, Gemini CLI.

## 📁 Cấu trúc thư mục chính

- `my-first-nextjs/`: Thư mục chứa mã nguồn ứng dụng Next.js.
- `main.js`, `about.html`, `bai-tap-copilot.js`: Các file thực hành Git workflow và Copilot cơ bản.

## 💻 Hướng dẫn chạy dự án Next.js

Để khởi chạy ứng dụng web trên máy của bạn, hãy làm theo các bước sau:

1. Di chuyển vào thư mục Next.js:
   ```bash
   cd my-first-nextjs
   ```

## Lab 4 - Supabase (khong doi giao dien)

Project da duoc tich hop Supabase o tang du lieu cho Guestbook, khong thay doi UI hien tai.

### 1) Cai dat dependency

```bash
npm install
```

### 2) Tao bien moi truong

```bash
cp .env.local.example .env.local
```

Cap nhat gia tri that trong `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3) Tao bang va RLS tren Supabase

Mo Supabase SQL Editor va chay file:

- `supabase/lab4_guestbook.sql`

### 4) Chay project

```bash
npm run dev
```

Neu chua co bien moi truong Supabase, app van chay bang du lieu fallback trong bo nho (de dev local).
