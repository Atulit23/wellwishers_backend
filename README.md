# Decorate My Tree - Backend API

A Node.js/Express backend API for the "Decorate My Tree" application. This API allows users to create personalized trees, share them via unique links, and let others add ornaments with messages.

## 🌟 Features

- **User Authentication**: Simple signup/login using just email and name
- **Unique Tree IDs**: Each user gets a unique UUID-based treeId for sharing
- **Ornament System**: Visitors can add ornaments with personalized messages
- **Tree Sharing**: Share your tree link with others to collect ornaments
- **RESTful API**: Clean and intuitive API endpoints

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **UUID** - Unique identifier generation
- **dotenv** - Environment variable management

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🚀 Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/wellwishers
   PORT=3000
   ```

   For MongoDB Atlas (cloud), use:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/wellwishers
   PORT=3000
   ```

4. **Start the server**:
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## 📁 Project Structure

```
wellwishers_backend/
├── config/
│   └── db.js              # MongoDB connection configuration
├── models/
│   └── User.js            # User schema with treeId and treeDecos
├── routes/
│   ├── userRoutes.js      # User signup/login & tree retrieval routes
│   └── treeRoutes.js      # Ornament operations routes
├── index.js               # Express server setup and entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (not in git)
└── README.md              # This file
```

## 🗄️ Database Schema

### User Model

```javascript
{
  name: String,           // User's name (required)
  email: String,          // User's email (required, unique)
  treeId: UUID,           // Unique tree identifier (auto-generated)
  treeName: String,       // Name of the tree (required)
  treeDecos: [            // Array of ornaments
    {
      name: String,       // Name of person adding ornament
      email: String,      // Email of person adding ornament
      ornament: String,   // Type/name of ornament
      message: String,    // Message from the person
      userId: UUID,       // Unique ID for the person (provided by frontend)
      x: Number,          // X coordinate position of the ornament (required)
      y: Number,          // Y coordinate position of the ornament (required)
      createdAt: Date,    // Timestamp (auto-generated)
      updatedAt: Date     // Timestamp (auto-generated)
    }
  ],
  createdAt: Date,        // Timestamp (auto-generated)
  updatedAt: Date         // Timestamp (auto-generated)
}
```

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### 1. User Signup/Login

**Endpoint:** `POST /api/signup`

**Description:** Creates a new user or logs in an existing user. If the email already exists, it returns the user data (login). Otherwise, it creates a new user with a unique treeId.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "treeName": "My Holiday Tree"
}
```

**Success Response (New User - 201):**
```json
{
  "message": "User created successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "treeId": "550e8400-e29b-41d4-a716-446655440000",
    "treeName": "My Holiday Tree",
    "treeDecos": []
  }
}
```

**Success Response (Existing User - 200):**
```json
{
  "message": "Login successful",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "treeId": "550e8400-e29b-41d4-a716-446655440000",
    "treeName": "My Holiday Tree",
    "treeDecos": [
      {
        "name": "Jane Smith",
        "email": "jane@example.com",
        "ornament": "Star",
        "message": "Happy Holidays!",
        "userId": "660e8400-e29b-41d4-a716-446655440001",
        "x": 150,
        "y": 200,
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

**Error Response (400):**
```json
{
  "error": "Name, email, and treeName are required"
}
```

---

### 2. Get Tree by treeId

**Endpoint:** `GET /api/tree/:treeId`

**Description:** Retrieves tree information by treeId. Used when someone visits a shared tree link.

**URL Parameters:**
- `treeId` (required) - The unique tree identifier

**Example Request:**
```
GET /api/tree/550e8400-e29b-41d4-a716-446655440000
```

**Success Response (200):**
```json
{
  "treeOwner": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "treeId": "550e8400-e29b-41d4-a716-446655440000",
  "treeName": "My Holiday Tree",
  "treeDecos": [
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "ornament": "Star",
      "message": "Happy Holidays!",
      "userId": "660e8400-e29b-41d4-a716-446655440001",
      "x": 150,
      "y": 200,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Error Response (404):**
```json
{
  "error": "Tree not found"
}
```

---

### 3. Get User Details by treeId

**Endpoint:** `GET /api/user/tree/:treeId`

**Description:** Retrieves complete user details including all user information and timestamps by treeId.

**URL Parameters:**
- `treeId` (required) - The unique tree identifier

**Example Request:**
```
GET /api/user/tree/550e8400-e29b-41d4-a716-446655440000
```

**Success Response (200):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "treeId": "550e8400-e29b-41d4-a716-446655440000",
  "treeName": "My Holiday Tree",
  "treeDecos": [
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "ornament": "Star",
      "message": "Happy Holidays!",
      "userId": "660e8400-e29b-41d4-a716-446655440001",
      "x": 150,
      "y": 200,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "createdAt": "2024-01-10T08:00:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (404):**
```json
{
  "error": "User not found"
}
```

---

### 4. Add Ornament to Tree

**Endpoint:** `POST /api/tree/:treeId/ornament`

**Description:** Adds a new ornament to a tree. The userId must be provided by the frontend in the request payload.

**URL Parameters:**
- `treeId` (required) - The unique tree identifier

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "ornament": "Star",
  "message": "Wishing you a wonderful holiday season!",
  "userId": "660e8400-e29b-41d4-a716-446655440001",
  "x": 150,
  "y": 200
}
```

**Success Response (201):**
```json
{
  "message": "Ornament added successfully",
  "ornament": {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "ornament": "Star",
    "message": "Wishing you a wonderful holiday season!",
    "userId": "660e8400-e29b-41d4-a716-446655440001",
    "x": 150,
    "y": 200
  },
  "treeDecos": [
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "ornament": "Star",
      "message": "Wishing you a wonderful holiday season!",
      "userId": "660e8400-e29b-41d4-a716-446655440001",
      "x": 150,
      "y": 200,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Error Response (400):**
```json
{
  "error": "Name, email, ornament, message, userId, x, and y coordinates are required"
}
```
**Error Response (404):**
```json
{
  "error": "Tree not found"
}
```

---

### 5. Get All Ornaments for a Tree

**Endpoint:** `GET /api/tree/:treeId/ornaments`

**Description:** Retrieves all ornaments for a specific tree.

**URL Parameters:**
- `treeId` (required) - The unique tree identifier

**Example Request:**
```
GET /api/tree/550e8400-e29b-41d4-a716-446655440000/ornaments
```

**Success Response (200):**
```json
{
  "treeId": "550e8400-e29b-41d4-a716-446655440000",
  "treeName": "My Holiday Tree",
  "treeOwner": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "ornaments": [
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "ornament": "Star",
      "message": "Happy Holidays!",
      "userId": "660e8400-e29b-41d4-a716-446655440001",
      "x": 150,
      "y": 200,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "name": "Bob Johnson",
      "email": "bob@example.com",
      "ornament": "Bell",
      "message": "Merry Christmas!",
      "userId": "770e8400-e29b-41d4-a716-446655440002",
      "x": 300,
      "y": 150,
      "createdAt": "2024-01-15T11:00:00.000Z",
      "updatedAt": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

**Error Response (404):**
```json
{
  "error": "Tree not found"
}
```

---

### 5. Health Check

**Endpoint:** `GET /health`

**Description:** Simple health check endpoint to verify the server is running.

**Success Response (200):**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/wellwishers` |
| `PORT` | Server port number | `3000` |

## 📝 Example Usage

### Using cURL

**1. Signup/Login:**
```bash
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "treeName": "My Holiday Tree"
  }'
```

**2. Get Tree:**
```bash
curl http://localhost:3000/api/tree/550e8400-e29b-41d4-a716-446655440000
```

**3. Get User Details:**
```bash
curl http://localhost:3000/api/user/tree/550e8400-e29b-41d4-a716-446655440000
```

**4. Add Ornament:**
```bash
curl -X POST http://localhost:3000/api/tree/550e8400-e29b-41d4-a716-446655440000/ornament \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "ornament": "Star",
    "message": "Happy Holidays!",
    "userId": "660e8400-e29b-41d4-a716-446655440001",
    "x": 150,
    "y": 200
  }'
```

### Using JavaScript (Fetch API)

```javascript
// Signup/Login
const signup = async () => {
  const response = await fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      treeName: 'My Holiday Tree'
    })
  });
  const data = await response.json();
  console.log(data);
};

// Get User Details by treeId
const getUserDetails = async (treeId) => {
  const response = await fetch(`http://localhost:3000/api/user/tree/${treeId}`);
  const data = await response.json();
  console.log(data);
};

// Add Ornament
const addOrnament = async (treeId, userId, x, y) => {
  const response = await fetch(`http://localhost:3000/api/tree/${treeId}/ornament`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Jane Smith',
      email: 'jane@example.com',
      ornament: 'Star',
      message: 'Happy Holidays!',
      userId: userId,
      x: x,
      y: y
    })
  });
  const data = await response.json();
  console.log(data);
};
```

## 🐛 Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (missing or invalid parameters)
- `404` - Not Found (tree/user not found)
- `500` - Internal Server Error

Error responses follow this format:
```json
{
  "error": "Error message",
  "message": "Detailed error message (optional)"
}
```

## 🔒 CORS

The API currently allows all origins for development. In production, you should configure CORS to only allow your frontend domain.

## 📦 Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with auto-reload (nodemon)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

ISC

## 👤 Author

Wellwishers Backend Team

---

**Note:** Make sure MongoDB is running before starting the server. The server will automatically connect to MongoDB using the connection string provided in the `.env` file.

