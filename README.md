# ExpertSync Backend

Professional Node.js/Express API for managing expert sessions and real-time bookings.

## 🚀 Features
- **Booking Management**: Create, view, and manage expert sessions.
- **Expert Directory**: Comprehensive API for listing and searching experts.
- **Real-time Updates**: Integrated with Socket.IO for live slot updates.
- **Validation**: Strict request validation using Joi.
- **API Documentation**: Interactive Swagger UI at `/api-docs`.

## 🛠 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Communication**: Socket.IO
- **Documentation**: Swagger/OpenAPI

## 📦 Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Oguntayo/expert_sync_backend.git
   cd expert_sync_backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Run the server**:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📚 API Documentation
Once the server is running, visit `http://localhost:5000/api-docs` to explore the interactive API documentation.
