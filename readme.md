# create-mern-api

A professional CLI tool to scaffold a **production-ready MERN backend** with a clean architecture, best practices, and minimal setup.

This tool eliminates repetitive boilerplate and lets developers start backend development immediately.

---

## Features

- Express.js backend with modern ES modules
- MongoDB integration using Mongoose
- Authentication-ready structure (JWT-based)
- Centralized error handling
- Scalable folder structure
- Environment variable support
- ESLint + Prettier configuration
- Ready-to-extend API architecture

---

## Requirements

- Node.js >= 18
- npm >= 9
- MongoDB (local or cloud)

---

## Usage

Create a new backend project using:

```bash
npx create-mern-api my-backend
```

This will:

1. Create a new folder named `my-backend`
2. Copy a pre-configured backend template
3. Install all required dependencies

---

## After Installation

Move into the project directory:

```bash
cd my-backend
```

Update `.env` with your own values:

```env
PORT=
MONGODB_URI=
CORS_ORIGIN=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=
```

Start the development server:

```bash
npm run dev
```

---

## Project Structure

```
my-backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── database/
│   ├── utils/
│   ├── app.js
|   └── constants.js
│   └── index.js
├── .env
├── .prettierignore
├── .prettierrc
├── .gitignore
├── package-lock.json
├── eslint.config.js
├── package.json
└── README.md
```

---

## Philosophy

This CLI follows these principles:

- No unnecessary abstractions
- Clear separation of concerns
- Easy onboarding for new developers
- Production-oriented defaults

---

## Why use create-mern-api?

Most MERN developers waste time re-writing:

- Express setup
- Database connection logic
- Auth boilerplate
- Error handling
- Folder structures

This CLI removes that friction.

---

## Customization

The generated backend is intentionally minimal.

You are expected to:
- Add business logic
- Extend routes and controllers
- Customize authentication and authorization
- Plug in additional services as needed

---

## Author

**Aditya Shriwas**

---

## License

MIT License
