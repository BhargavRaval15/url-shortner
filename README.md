# Link Analytics Dashboard

A full-stack URL shortener with analytics dashboard, built with React, Node.js, and MongoDB.

## Features

- 🔐 User Authentication with JWT
- 🔗 URL Shortening with custom aliases
- 📊 Analytics Dashboard with detailed metrics
- 📱 Responsive Design
- 🚀 Real-time click tracking
- 📈 Interactive charts and visualizations
- 🔍 Advanced Search & Pagination
- 📱 QR Code Generation
- 📊 Detailed Analytics Charts

## Tech Stack

- Frontend: React.js, Redux Toolkit, Chart.js, TailwindCSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Features in Detail

### URL Management

- Create short URLs with custom aliases
- Set expiration dates for URLs
- Copy short URLs to clipboard
- Generate QR codes for easy sharing
- View and manage all your URLs in one place

### Analytics Dashboard

- Real-time click tracking
- Interactive line chart showing clicks over time
- Device distribution analysis with doughnut chart
- Browser usage statistics with doughnut chart
- Total click count and detailed metrics

### Advanced Features

- Search functionality for URLs
- Pagination with 5 URLs per page
- Smart pagination controls with Previous/Next buttons
- Responsive design for all screen sizes
- Real-time data updates

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/BhargavRaval15/url-shortner.git
```

2. Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
   Create a `.env` file in the backend directory:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Start the development servers

```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm start
```

## Test Credentials

- Email: intern@dacoid.com
- Password: Test123

## Project Structure

```
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   │   ├── UrlList.tsx      # URL list with pagination and search
│   │   │   ├── UrlAnalytics.tsx # Analytics charts and visualizations
│   │   │   └── CreateUrl.tsx    # URL creation form
│   │   ├── pages/      # Page components
│   │   ├── store/      # Redux store and slices
│   │   └── utils/      # Utility functions
│   └── public/         # Static assets
│
├── backend/            # Node.js backend application
│   ├── src/
│   │   ├── controllers/ # Route controllers
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   └── middleware/  # Custom middleware
│   └── .env            # Environment variables
│
└── README.md           # Project documentation
```

## Analytics Features

### Clicks Over Time

- Interactive line chart
- Daily click tracking
- Custom date formatting
- Responsive design

### Device Distribution

- Doughnut chart visualization
- Percentage-based distribution
- Color-coded segments
- Interactive legend

### Browser Usage

- Doughnut chart visualization
- Browser type distribution
- Percentage calculations
- Interactive tooltips

## Contributing

Feel free to submit issues and enhancement requests!

## API Documentation

### Authentication

- POST /api/auth/login - User login
- POST /api/auth/register - User registration

### URL Management

- POST /api/urls - Create short URL
- GET /api/urls - Get user's URLs
- GET /api/urls/:id - Get URL details
- DELETE /api/urls/:id - Delete URL

### Analytics

- GET /api/analytics/:urlId - Get URL analytics

## License

MIT
