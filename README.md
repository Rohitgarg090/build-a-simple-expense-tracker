# 💸 Expense Tracker

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- A [Supabase](https://supabase.com) account and project

---

## 📦 Installation

### 1. Clone the Repository

git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker

### 2. Install All Dependencies

npm install

---

## ⚙️ Environment Setup

### Backend (Root `.env`)

Copy the example env file and fill in your values:

cp .env.example .env

Edit `.env` with your Supabase credentials:

co
SUPABASE_ANON_KEY=your-anon-key
PORT=4000

### Frontend (`frontend/.env.local`)

cp frontend/.env.example frontend/.env.local

Edit `frontend/.env.local`:

NEXT_PUBLIC_API_URL=http://localhost:4000
co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

---

## 🗄️ Supabase Database Setup

Run the following SQL in your Supabase SQL editor:

CREATE TABLE expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

---

## 🖥️ Running the App

### Run Backend (Express API)

npm run server

The API will start at `http://localhost:4000`

### Run Frontend (Next.js)

cd frontend && npm install && npm run dev

The app will start at `http://localhost:3000`

### Run Both Concurrently (from root)

npm run dev

---

## 📁 Project Structure

expense-tracker/
├── backend/
│   ├── routes/
│   │   └── expenses.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── supabaseClient.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js
│   │   │   ├── page.js
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── ExpenseCard.jsx
│   │   │   └── Summary.jsx
│   │   └── lib/
│   │       └── api.js
│   ├── .env.example
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── package.json
├── .env.example
├── .gitignore
└── package.json

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Create a new expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |

---

## 🧰 Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** Supabase (PostgreSQL)
- **Icons:** Lucide React

---

## 📝 License

MIT