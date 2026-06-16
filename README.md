# AI Helpdesk Assistant

An AI-powered Helpdesk Ticketing System that helps users troubleshoot IT issues before raising support tickets.

---

## Project Overview

AI Helpdesk Assistant is a full-stack web application developed using:

- React.js
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication

The system analyzes user-reported issues, suggests troubleshooting steps, and allows users to create support tickets if the issue remains unresolved.

---

## Features

### User Authentication
- User Registration
- User Login
- JWT-Based Authentication
- Secure Password Hashing using bcrypt

### AI Troubleshooting Engine
- Analyze issue title and description
- Categorize issues:
  - Network
  - Software
  - Hardware
  - Account
  - Other
- Assign issue priority:
  - Low
  - Medium
  - High
- Generate troubleshooting suggestions

### Ticket Management
- Create support tickets
- View ticket history
- Track ticket status
- View creation date

### Resolution Workflow
- Mark issue as resolved without creating a ticket
- Store AI interaction history

---

## System Architecture

Frontend (React)
↓
Backend API (Express)
↓
Prisma ORM
↓
PostgreSQL Database

---

## Technology Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- Node.js
- Express.js
- JWT
- bcrypt

### Database
- PostgreSQL
- Prisma ORM

---

## Database Schema

### User

| Field | Type |
|---------|---------|
| id | Int |
| name | String |
| email | String |
| password | String |

### Ticket

| Field | Type |
|---------|---------|
| id | Int |
| title | String |
| description | String |
| category | String |
| priority | String |
| status | String |
| createdDate | DateTime |

### AISession

| Field | Type |
|---------|---------|
| id | Int |
| title | String |
| description | String |
| aiResponse | String |
| resolvedByAI | Boolean |
| createdDate | DateTime |

---

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### AI

POST /api/ai/troubleshoot

POST /api/ai/resolve

### Tickets

POST /api/tickets

GET /api/tickets

---

## Installation

### Clone Repository

```bash
git clone https://github.com/<your-username>/ai-helpdesk-assistant.git
```

### Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
DATABASE_URL=postgresql://username:password@localhost:5432/ai_helpdesk
JWT_SECRET=your_secret_key
```

Run Prisma

```bash
npx prisma db push
```

Start Backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend

npm install
```

Start Frontend

```bash
npm run dev
```

---

## Test Cases

### Test Case 1: User Login

Input:
Valid Email and Password

Expected Result:
JWT token generated and user logged in.

Status:
Pass

---

### Test Case 2: AI Troubleshooting

Input:
VPN Connection Issue

Expected Result:
Category = Network
Priority = High
Suggestions Generated

Status:
Pass

---

### Test Case 3: Ticket Creation

Input:
Create ticket after AI analysis

Expected Result:
Ticket stored in PostgreSQL database.

Status:
Pass

---

## Future Enhancements

- OpenAI/Gemini Integration
- Duplicate Ticket Detection
- AI Ticket Summarization
- Admin Dashboard
- Email Notifications
- Ticket Escalation Workflow

---

## Author

Aswin Suriya

Computer Science and Business Systems (CSBS)

Vellore Institute of Technology
