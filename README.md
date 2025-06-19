# AI Content Idea Generator

A powerful web application that helps content creators, marketers, and social media managers generate fresh and relevant content ideas for their blogs, videos, and social media channels.

## 🌟 Features

- **AI-Powered Idea Generation**: Generate creative content ideas based on topics, industries, and target audiences
- **Trend Analysis**: Identify trending topics and content opportunities in your niche
- **Content Calendar Planning**: Plan and schedule your content with an intuitive calendar interface
- **Smart Recommendations**: Get recommendations for content formats, keywords, and optimization
- **User Profiles**: Save favorite ideas and track content performance
- **Analytics Dashboard**: Visualize content performance and audience engagement

## 🛠️ Tech Stack

### Frontend
- React.js with TypeScript
- Material-UI for UI components
- React Context API for state management
- React Router for navigation
- Axios for API requests
- Chart.js for analytics visualization

### Backend
- Node.js with Express.js
- MongoDB for database
- JWT for authentication
- OpenAI API integration
- Redis for caching
- REST API architecture

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB
- Redis (optional, for production)

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/ai-content-idea-generation-platform.git
cd ai-content-idea-generation-platform
```

2. Install dependencies for the backend
```bash
cd server
npm install
```

3. Set up environment variables for the backend
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Install dependencies for the frontend
```bash
cd ../client
npm install
```

5. Set up environment variables for the frontend
```bash
cp .env.example .env
# Edit .env with your credentials
```

6. Start the development servers
```bash
# In the server directory
npm run dev

# In the client directory (in a new terminal)
npm start
```

## 📋 Project Structure

```
ai-content-idea-generator/
├── client/                  # Frontend React application
│   ├── public/              # Public assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React context for state management
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   └── App.tsx          # Main App component
│   └── package.json         # Frontend dependencies
├── server/                  # Backend Node.js/Express application
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── app.js           # Express app
│   └── package.json         # Backend dependencies
└── README.md                # Project documentation
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Content Ideas
- `POST /api/ideas/generate` - Generate new content ideas
- `GET /api/ideas` - List saved ideas
- `GET /api/ideas/:id` - Get specific idea
- `PUT /api/ideas/:id` - Update idea
- `DELETE /api/ideas/:id` - Delete idea

### Trends
- `GET /api/trends` - Get current trends
- `GET /api/trends/industry/:industry` - Get industry-specific trends
- `GET /api/trends/keyword/:keyword` - Get keyword-related trends

### Calendar
- `GET /api/calendar` - Get content calendar
- `POST /api/calendar/event` - Add calendar event
- `PUT /api/calendar/event/:id` - Update calendar event
- `DELETE /api/calendar/event/:id` - Delete calendar event

## 🔒 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/content-idea-generator
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
REDIS_URL=redis://localhost:6379
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Testing

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📫 Contact

Project Link: [https://github.com/dxaginfo/ai-content-idea-generation-platform](https://github.com/dxaginfo/ai-content-idea-generation-platform)