
---

# 📘 **SETUP.md**

## Complete Setup, Installation & Run Instructions


---

# 📂 **Project Overview**

This repository contains **multiple independent assignments**, each implemented using modern frontend technologies and simple, exam-friendly backend stacks.

All UI follows the **ERP-style design language**
(Inter font, bold black borders, OKLCH color variables, clean minimal cards).

Assignments included:

1. **Bootstrap Tabs F1 Dashboard**
2. **jQuery Portfolio Viewer**
3. **React Marks Entry App**
4. **React + PHP + MySQL Marks Backend**
5. **Online Bookstore (React + PHP + MySQL)**

Each project is self-contained and can run independently.

---

# ⚙️ **Prerequisites**

Install the following on your system:

### ✔ Node.js

[https://nodejs.org/](https://nodejs.org/)

### ✔ XAMPP (Apache + MySQL)

[https://www.apachefriends.org/](https://www.apachefriends.org/)

### ✔ Git (optional)

[https://git-scm.com/](https://git-scm.com/)


---

# 

# **ASSIGNMENT 1 — Bootstrap F1 Dashboard**

# 

A simple **Bootstrap tabs/pills** UI containing:

* 2023 Driver Standings
* Constructor Standings
* Race Schedule

### 📁 Folder:

```
assignment1-f1-dashboard/
```

### ▶ How to Run

Just open:

```
index.html
```

in any browser.

### 📦 Required CDN (already included in final code):

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

### 🎨 UI Theme

ERP styling using:

* Inter font
* OKLCH colors
* Cyan/purple accents

All CSS is inline or in `style.css`.

---

# 

# 🧩 **ASSIGNMENT 2 — jQuery Project Viewer**

# 

A simple web app that dynamically displays project details for:

* ML
* Cloud
* DAA
* CNT
* EDAI

### 📁 Folder:

```
assignment2-jquery-projectviewer/
```

### ▶ How to Run

Open:

```
index.html
```

### 📦 Required CDN (already included):

```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

### 🧠 Logic

Each button toggles content via `.toggle-btn` and updates a card dynamically.

---

# 

# 📝 **ASSIGNMENT 3 — React Marks Entry App**

# 

React-based ERP-style UI to enter:

* MSE (30%)
* ESE (70%)
* Auto-calc final marks

### 📁 Folder:

```
assignment3-marks-app/
```

---

## ▶ Installation

```
cd assignment3-marks-app
npm install
npm run dev
```

This opens the app at:

```
http://localhost:5173
```

---

## 🛠 Tailwind Setup

Tailwind 3 with ERP theme:

if required, run the following commands:

 npm install -D tailwindcss@3 postcss autoprefixer
 
 npx tailwindcss init

### tailwind.config.js

```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

# 

# 🧮 **ASSIGNMENT 4 — Marks Backend (PHP + MySQL)**

# 

Backend storing marks entered from Assignment 3.

### 📁 Folder:

```
assignment4-marks-backend/
```

Place this folder inside XAMPP:

```
C:\xampp\htdocs\marks-backend\
```

---

## 🗄 Database Setup

Open phpMyAdmin:

```
http://localhost/phpmyadmin
```

Run:

```sql
CREATE DATABASE marksdb;
USE marksdb;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  roll VARCHAR(50)
);

CREATE TABLE subject_marks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  subject VARCHAR(50),
  mse FLOAT,
  ese FLOAT,
  final FLOAT
);
```

---

## ▶ Backend Files

### ✔ db.php

### ✔ save_marks.php

### ✔ get_all_results.php

### ✔ get_result.php

(All files already included in backend folder.)

---

## ▶ Testing Backend

Open:

```
http://localhost/marks-backend/get_all_results.php
```

Should show JSON.

Then connect React Marks App to backend:

* Save marks
* View results page

---

# 

# 📚 **ASSIGNMENT 5 — Online Bookstore (React + PHP + MySQL)**

# 

A complete online bookstore with:

* Home page
* Login
* Register
* Catalogue
* (Optional) Add books
* ERP-style UI

---

# 📁 Folder Structure

```
assignment5-bookstore/
│
├── bookstore-app/          ← React frontend
└── bookstore-backend/      ← PHP backend
```

Place the backend folder inside XAMPP:

```
C:\xampp\htdocs\bookstore-backend\
```

---

# 🗄 DATABASE SETUP

Open:

```
http://localhost/phpmyadmin
```

Run:

```sql
CREATE DATABASE bookstore;
USE bookstore;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  email VARCHAR(150),
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(150),
  price DECIMAL(8,2),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 📚 Dummy Book Data (15 books)

Paste:

```sql
INSERT INTO books (title, author, price, description) VALUES
('Clean Code','Robert C. Martin',399,'A handbook of agile software craftsmanship.'),
('Atomic Habits','James Clear',299,'Build good habits and break bad ones.'),
('Deep Work','Cal Newport',320,'Focus without distraction.'),
('The Pragmatic Programmer','Andrew Hunt',450,'Journey to Mastery.'),
('Introduction to Algorithms','CLRS',999,'Definitive algorithms textbook.'),
('The Psychology of Money','Morgan Housel',280,'Timeless lessons on wealth.'),
('Hooked','Nir Eyal',250,'How to build habit-forming products.'),
('Zero to One','Peter Thiel',270,'Notes on startups.'),
('The Alchemist','Paulo Coelho',199,'Journey of self-discovery.'),
('1984','George Orwell',150,'Dystopian novel.'),
('Sapiens','Yuval Noah Harari',399,'A brief history of humankind.'),
('Steve Jobs','Walter Isaacson',499,'Story of Steve Jobs.'),
('The Art of War','Sun Tzu',120,'Ancient military strategy.'),
('Cracking the Coding Interview','Gayle Laakmann',650,'Coding interview prep.'),
('Rich Dad Poor Dad','Robert Kiyosaki',180,'Personal finance classic.');
```

---

# ▶ RUNNING THE FRONTEND (React)

```
cd assignment5-bookstore/bookstore-app
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

# ▶ RUNNING THE BACKEND (PHP)

Start XAMPP:

* Apache → Start
* MySQL → Start

Then open:

```
http://localhost/bookstore-backend/get_books.php
```

You should see JSON.

---

# ✔ UI Pages

## Home

* Featured books
* Navigation

## Register

* Sends JSON → PHP register.php
* Password hashed

## Login

* Validates via login.php
* User stored in localStorage

## Catalogue

* Fetches books via get_books.php
* 3-column ERP grid

---

# 

# 🧪 **QUICK TESTING CHECKLIST (All Assignments)**

# 

### ✔ Node installed

`node -v`

### ✔ Tailwind installed (React projects)

`npm list tailwindcss`

### ✔ XAMPP running

Apache: **running**
MySQL: **running**

### ✔ PHP backend reachable

Visit in browser:

```
http://localhost/bookstore-backend/get_books.php
```

### ✔ MySQL DB created

Check tables + rows in phpMyAdmin.

### ✔ React frontend loads correctly

```
npm run dev
```

---