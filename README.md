# 🎯 Guess the Word

A full-stack word guessing game built with **React** and **Spring Boot**.

Guess the hidden five-letter word in up to five attempts. Use the color hints to narrow it down, manage your daily games, and see how you perform.

---

## ✨ Features

### 🎮 Gameplay

- Random five-letter word for every game
- Maximum **5 guesses** per game
- Maximum **3 games per day** per player
- Letter-by-letter input
- On-screen Wordle-style keyboard
- Previous guesses remain visible
- Instant visual feedback:
  - 🟩 **Green** — correct letter and position
  - 🟨 **Yellow** — correct letter, wrong position
  - ⬜ **Grey** — letter not in the word
- Win and loss result screens

### 🔐 Authentication

- User registration and login
- BCrypt password hashing
- JWT-based authentication
- Short-lived access tokens
- Refresh tokens using secure HttpOnly cookies
- Automatic access-token renewal
- Logout
- Role-based access control
- Protected frontend routes
- Show/hide password functionality

### 👤 Player

Players can:

- Register and log in
- Start a game
- Submit guesses
- Play up to three games per day

### 👑 Admin

Admins have access to a dedicated dashboard where they can:

- View daily game statistics
- See the number of users who played
- See the number of correct games
- Select individual users
- View their game history
- See number of words tried and correct guesses by date

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide React

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT
- Lombok

### Database

- MySQL

### Tools

- Git
- GitHub
- Postman

---

## 📸 Screenshots

### 🔐 Login and Registration

<img width="1918" height="858" alt="Screenshot 2026-08-15 141943" src="https://github.com/user-attachments/assets/f98a3444-e169-49e1-bb86-88d770dbcf6c" /> 
<img width="1918" height="858" alt="Screenshot 2026-08-15 142013" src="https://github.com/user-attachments/assets/3bcacfff-c8d6-4080-979c-04b35f3558e9" />

### 🎮 Gameplay

<img width="1917" height="867" alt="Screenshot 2026-08-15 142637" src="https://github.com/user-attachments/assets/9940bb55-4ef8-4820-80e8-fff6170e009c" />
<img width="1919" height="866" alt="Screenshot 2026-08-15 142651" src="https://github.com/user-attachments/assets/5563654e-708a-4806-b759-024398e5246e" />

### 🎯 Guess Feedback

<img width="1919" height="860" alt="Screenshot 2026-08-15 144450" src="https://github.com/user-attachments/assets/2084fdf8-d35f-4658-b561-90308e7595e1" />

### 🏆 Game Result

<img width="1919" height="863" alt="Screenshot 2026-08-15 144504" src="https://github.com/user-attachments/assets/813e18d1-0d58-4731-852a-40f971f87b54" />
<img width="1918" height="862" alt="Screenshot 2026-08-15 144617" src="https://github.com/user-attachments/assets/c0e85253-2d9e-4c07-87ae-bd3eb3088184" />

### 👑 Admin Dashboard

<img width="1899" height="858" alt="Screenshot 2026-08-15 144710" src="https://github.com/user-attachments/assets/11d0d56b-10ee-4f0a-8ba8-c5f9bb7bc4dd" />
<img width="1900" height="854" alt="Screenshot 2026-08-15 144850" src="https://github.com/user-attachments/assets/2b7725d8-cda7-4adc-aefb-54c36aa5ffd7" />

