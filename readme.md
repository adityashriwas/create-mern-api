# create-mern-api

<div align="center">

[![npm version](https://img.shields.io/npm/v/create-mern-api)](https://www.npmjs.com/package/create-mern-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)

A professional CLI tool to scaffold a **production-ready MERN backend** with clean architecture, industry best practices, and zero configuration overhead.

Build scalable, maintainable backend applications in seconds. Ship faster, code better. 🚀

[Features](#features) • [Installation](#installation) • [Quick Start](#quick-start) • [Architecture](#architecture) • [Configuration](#configuration) • [Scripts](#scripts)

</div>

---

## 🎯 About

`create-mern-api` eliminates repetitive boilerplate and architectural decisions, letting developers focus on building features instead of setting up infrastructure. This CLI scaffolds a fully-configured Express.js backend following industry best practices, complete with MongoDB integration, authentication-ready middleware, centralized error handling, and code quality tools.

Perfect for:
- Building production-grade REST APIs
- Starting enterprise projects quickly
- Learning MERN architecture patterns
- Creating API microservices
- Teaching backend development

---

## ✨ Features

- **Express.js 5.x** - Modern, minimal web framework with ES modules
- **MongoDB & Mongoose** - Document database with schema validation
- **Authentication Ready** - JWT-based auth structure with bcrypt password hashing
- **Centralized Error Handling** - Custom API error classes and response formatting
- **Scalable Architecture** - Clean folder structure following industry standards
- **CORS & Security** - Pre-configured cross-origin and security middleware
- **Environment Variables** - 12-factor app methodology with dotenv
- **Code Quality** - ESLint + Prettier for consistent, professional code
- **Hot Reload** - Nodemon for rapid development
- **Dependency Management** - Pre-selected, production-tested packages

---

## 📋 Requirements

| Requirement | Version |
|---|---|
| **Node.js** | `>= 18` |
| **npm** | `>= 9` |
| **MongoDB** | Local or Cloud (Atlas) |

---

## 🚀 Installation

### Global Installation (Recommended)

```bash
npm install -g create-mern-api
```

### One-Time Usage

```bash
npx create-mern-api my-backend
```

---

## ⚡ Quick Start

### 1. Create Your Backend

```bash
npx create-mern-api my-backend
cd my-backend
```

### 2. Configure Environment Variables

Update the `.env` file with your configuration:

```env
# Server Configuration
PORT=8000

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# JWT Configuration
ACCESS_TOKEN_SECRET=your-super-secret-access-token-key
ACCESS_TOKEN_EXPIRY=7d
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key
REFRESH_TOKEN_EXPIRY=10d
```

### 3. Start Development Server

```bash
npm run dev
```

Server will start at `http://localhost:8000`

---

## 📁 Project Structure

The generated backend follows a clean, layered architecture:

```
my-backend/
├── src/
│   ├── controllers/                 # Request handlers & business logic
│   │   └── user.controller.js      # Example user controller
│   ├── routes/                      # API route definitions
│   │   └── user.route.js           # Example user routes
│   ├── models/                      # MongoDB schemas
│   │   └── user.model.js           # Example user model
│   ├── middlewares/                 # Express middleware
│   │   └── auth.middleware.js      # JWT authentication
│   ├── database/                    # Database configuration
│   │   └── db.js                   # MongoDB connection
│   ├── utils/                       # Utility functions
│   │   ├── ApiError.js             # Error handling class
│   │   ├── ApiResponse.js          # Standard response formatting
│   │   └── asyncHandler.js         # Async error wrapper
│   ├── constants.js                 # Application constants
│   ├── app.js                       # Express app configuration
│   └── index.js                     # Server entry point
├── .env                             # Environment variables (gitignored)
├── .env.example                     # Environment template
├── .prettierrc                       # Code formatting config
├── .prettierignore                  # Prettier ignore rules
├── .gitignore                       # Git ignore rules
├── eslint.config.js                 # ESLint configuration
├── package.json                     # Dependencies & scripts
├── package-lock.json                # Dependency lock file
└── README.md                         # Project documentation
```

### Architecture Highlights

**Layered Architecture**: Clean separation of concerns
- **Controllers** - Handle HTTP requests, validate input, call services
- **Models** - Define data schemas and validations
- **Routes** - Define API endpoints and route handlers
- **Middlewares** - Handle cross-cutting concerns (auth, logging, etc.)
- **Utils** - Reusable utility functions and helpers

**Error Handling**: Custom `ApiError` class for consistent error responses
**Response Formatting**: Standardized `ApiResponse` class for all API responses
**Async Handling**: `asyncHandler` wrapper to eliminate try-catch boilerplate

---

## 📦 Included Dependencies

### Production Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| **express** | Web framework | `^5.2.1` |
| **mongoose** | MongoDB ODM | `^9.1.2` |
| **jsonwebtoken** | JWT authentication | `^9.0.3` |
| **bcryptjs** | Password hashing | `^3.0.3` |
| **cors** | Cross-origin requests | `^2.8.5` |
| **cookie-parser** | Cookie parsing | `^1.4.7` |
| **dotenv** | Environment variables | `^17.2.3` |

### Development Dependencies

- **nodemon** - Auto-restart on file changes
- **eslint** - Code linting
- **prettier** - Code formatting
- **eslint-config-prettier** - ESLint + Prettier integration

---

## 🛠️ Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Start production server
npm start

# Lint code
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting without changes
npm run format:check
```

---

## 📋 Configuration Guide

### Environment Variables

#### Server Configuration
- `PORT` - Server port (default: 8000)

#### Database Configuration
- `MONGODB_URI` - MongoDB connection string
  - Local: `mongodb://localhost:27017/database-name`
  - Atlas: `mongodb+srv://user:pass@cluster.mongodb.net/database-name`

#### Security Configuration
- `CORS_ORIGIN` - Frontend origin(s) for CORS
- `ACCESS_TOKEN_SECRET` - Secret key for JWT access tokens
- `REFRESH_TOKEN_SECRET` - Secret key for JWT refresh tokens

#### Token Expiry
- `ACCESS_TOKEN_EXPIRY` - Access token validity (e.g., `7d`, `24h`)
- `REFRESH_TOKEN_EXPIRY` - Refresh token validity (e.g., `10d`)

### Customizing ESLint & Prettier

**eslint.config.js** - Configure linting rules
**prettier.config.js** - Adjust code formatting style
**.prettierignore** - Exclude files from formatting

---

## 🔐 Authentication

The template includes JWT-based authentication with:

- Secure password hashing using bcryptjs
- JWT token generation and validation
- Refresh token mechanism for long-lived sessions
- Authentication middleware for protected routes

Example authentication flow:
```javascript
// Controllers can use the auth middleware
import { verifyJWT } from '../middlewares/auth.middleware.js';

app.get('/api/v1/users/profile', verifyJWT, (req, res) => {
  // User is authenticated
  res.json(req.user);
});
```

---

## 📚 API Response Format

### Success Response
```json
{
  "statusCode": 200,
  "data": {
    "id": "...",
    "name": "..."
  },
  "message": "Data retrieved successfully",
  "success": true
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Validation error",
  "errors": ["field error details"],
  "success": false
}
```

---

## 🌟 Best Practices Included

✅ **Clean Code** - Consistent formatting with ESLint & Prettier
✅ **Error Handling** - Centralized error management
✅ **Security** - CORS, helmet-ready, environment variables
✅ **Database** - Mongoose schema validation
✅ **Async/Await** - Modern async patterns with error handling
✅ **Modular** - Easy to extend with new routes/models
✅ **Documentation** - Self-documenting code structure
✅ **Development** - Hot reload with Nodemon

---

## 🚀 Getting Help

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify network access in MongoDB Atlas

**Port Already in Use**
- Change `PORT` in `.env`
- Or kill process: `lsof -i :8000` (Mac/Linux) or `netstat -ano` (Windows)

**Module Not Found**
- Run `npm install` again
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)
- [JWT.io](https://jwt.io/)

---

## 📄 License

MIT © 2025 Aditya Shriwas

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Found a bug or have suggestions? Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 💡 Philosophy

We believe backend development should be:
- **Fast** - No wasted time on boilerplate
- **Professional** - Following industry standards and best practices
- **Flexible** - Easy to extend and customize
- **Learner-Friendly** - Clear, well-organized code structure

This tool embodies these principles by providing a production-ready foundation that developers can build upon with confidence.

---

<div align="center">

Made with ❤️ by Aditya Shriwas

[⭐ Star on GitHub](https://github.com/aditya-shriwas) • [📦 NPM Package](https://www.npmjs.com/package/create-mern-api) • [🐛 Report Issue](https://github.com/aditya-shriwas/create-mern-api/issues)

</div>

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
