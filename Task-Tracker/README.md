# Task Tracker API

A RESTful API for managing tasks with user authentication built using Node.js, Express, and MongoDB.

## 📋 Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **User-specific Tasks**: Each user can only access and manage their own tasks
- **Password Security**: Passwords are hashed using bcrypt
- **Protected Routes**: JWT-based authentication middleware
- **API Documentation**: Interactive Swagger/OpenAPI documentation

## 🚀 Technologies

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt/bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **Swagger** - API documentation (swagger-jsdoc, swagger-ui-express)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Task-Tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_TOKEN=your_secret_jwt_token
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`

5. **Access API Documentation**
   
   Once the server is running, visit `http://localhost:5000/api-docs` to view the interactive Swagger documentation.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port number for the server | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://username:password@cluster.mongodb.net/` |
| `JWT_TOKEN` | Secret key for JWT signing | `your_secret_key_here` |

## 📖 API Documentation

### Interactive Documentation

Visit **`http://localhost:5000/api-docs`** when the server is running to access the interactive Swagger UI documentation. Here you can:

- View all available endpoints
- Test API calls directly from the browser
- See request/response schemas
- Authenticate and test protected routes

### Quick Start with Swagger

1. Start the server: `npm start`
2. Open `http://localhost:5000/api-docs` in your browser
3. Register a new user using the `/api/auth/register` endpoint
4. Login using the `/api/auth/login` endpoint to get a JWT token
5. Click the "Authorize" button (🔒) at the top of the Swagger UI
6. Enter your token as: `Bearer <your_token_here>`
7. Now you can test all protected endpoints!

## 📚 API Endpoints

### Authentication Routes

#### Register a new user
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User Registered successfully"
}
```

#### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

#### Logout
```http
POST /api/auth/logout
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Logout successful"
}
```

### Task Routes

All task routes require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

#### Get all tasks
```http
GET /api/tasks
```

**Response:**
```json
[
  {
    "_id": "task_id",
    "title": "Complete project",
    "description": "Finish the Task Tracker API",
    "completed": false,
    "user": "user_id",
    "createdAt": "2025-12-13T10:00:00.000Z",
    "updatedAt": "2025-12-13T10:00:00.000Z"
  }
]
```

#### Add a new task
```http
POST /api/tasks/add
```

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the Task Tracker API"
}
```

**Response:**
```json
{
  "message": "Task added successfully"
}
```

#### Update a task
```http
PUT /api/tasks/update/:id
```

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

**Response:**
```json
{
  "_id": "task_id",
  "title": "Updated title",
  "description": "Updated description",
  "completed": true,
  "user": "user_id",
  "createdAt": "2025-12-13T10:00:00.000Z",
  "updatedAt": "2025-12-13T10:30:00.000Z"
}
```

#### Delete a task
```http
DELETE /api/tasks/delete/:id
```

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

## 🗂️ Project Structure

```
Task-Tracker/
├── middleware/
│   └── authMiddleware.js    # JWT authentication middleware
├── models/
│   ├── task.js              # Task model schema
│   └── user.js              # User model schema
├── routes/
│   ├── authroute.js         # Authentication routes
│   └── taskroute.js         # Task CRUD routes
├── .env                     # Environment variables (not in repo)
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
├── server.js               # Main application entry point
├── swagger.js              # Swagger/OpenAPI configuration
└── README.md               # Project documentation
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication
- **Token Blacklist**: Logout functionality with token invalidation
- **Protected Routes**: Middleware ensures only authenticated users can access tasks
- **User Isolation**: Users can only access their own tasks

## 🛠️ Development

### Running in Development Mode

Install nodemon as a dev dependency (already included):
```bash
npm install -g nodemon
nodemon server.js
```

### Testing the API

You can test the API using tools like:
- **Postman** - GUI for API testing
- **cURL** - Command-line tool
- **Thunder Client** - VS Code extension
- **Insomnia** - REST client

Example cURL command:
```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'

# Get tasks (with token)
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📝 Models

### User Model
```javascript
{
  username: String (required, unique),
  password: String (required, hashed)
}
```

### Task Model
```javascript
{
  user: ObjectId (required, ref: "User"),
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  timestamps: true (createdAt, updatedAt)
}
```

## 🚨 Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `500` - Internal Server Error

Error responses follow this format:
```json
{
  "error": "Error message here"
}
```

## 🔄 Future Enhancements

- [ ] Add task priority levels
- [ ] Implement task categories/tags
- [ ] Add due dates and reminders
- [ ] Task sharing between users
- [ ] Search and filter functionality
- [ ] Pagination for task lists
- [ ] Rate limiting
- [ ] Input validation with express-validator
- [ ] Unit and integration tests
- [x] API documentation with Swagger

## 📄 License

ISC

## 👤 Author

Your Name

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Note**: Remember to keep your `.env` file secure and never commit it to version control. The `.gitignore` file is configured to exclude it from the repository.
