# AI Content Idea Generator - Full Stack Project

A full-stack web application that helps content creators, marketers, and social media managers generate fresh and relevant content ideas for their blogs, videos, and social media channels using AI.

## Project Overview

The AI Content Idea Generator is a comprehensive platform that utilizes artificial intelligence to assist users in generating creative and engaging content ideas. The application provides a user-friendly interface to input topics, analyze trends, schedule content, and organize ideas.

## 🌟 Key Features

- **AI-Powered Idea Generation**: Generate creative content ideas based on topics, industries, and target audiences
- **Trend Analysis**: Identify trending topics and content opportunities in your niche
- **Content Calendar Planning**: Plan and schedule your content with an intuitive calendar interface
- **Smart Recommendations**: Get recommendations for content formats, keywords, and optimization
- **User Profiles**: Save favorite ideas and track content performance
- **Analytics Dashboard**: Visualize content performance and audience engagement

## 📋 Project Structure

This project follows a full-stack architecture with separate frontend and backend components:

### Frontend (client/)

- Built with React.js and TypeScript
- Material-UI for responsive, modern UI components
- Context API for state management
- React Router for navigation

### Backend (server/)

- Node.js with Express.js
- MongoDB for database storage
- JWT for authentication
- OpenAI API integration for content generation

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB
- OpenAI API key

### Installation

#### Backend Setup

1. Navigate to the server directory
```bash
cd server
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on `.env.example` and add your credentials

4. Start the server
```bash
npm run dev
```

#### Frontend Setup

1. Navigate to the client directory
```bash
cd client
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on `.env.example` and add your API URL

4. Start the development server
```bash
npm start
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

## 🧪 Testing

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.
