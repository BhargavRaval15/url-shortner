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

### Demo Images

## Signin:
![Screenshot 2025-04-13 233522](https://github.com/user-attachments/assets/9a50e36c-7957-408e-a62e-b0e9c55b9ec5)

## Creating short url:
![Screenshot 2025-04-13 232351](https://github.com/user-attachments/assets/11c2ea21-d28a-4059-b674-1ffbc24b02d7)

## Short url created:
![Screenshot 2025-04-13 232439](https://github.com/user-attachments/assets/202c78ea-e884-49c4-896f-89e6aba4ce1f)

## Redirecting to url:
![Screenshot 2025-04-13 232455](https://github.com/user-attachments/assets/db3de6fc-0c68-4709-b4fd-d9a5c9596bce)

## Analyzing visits and click:
![Screenshot 2025-04-13 232542](https://github.com/user-attachments/assets/806cdda7-68d9-46b6-bd96-b8f86a0de6d2)

## Detailed analytical chart:
![Screenshot 2025-04-13 232559](https://github.com/user-attachments/assets/ef3d0555-5d06-4ebe-ab4a-80bf3efb0c95)

## Data update in mongodb:
![image](https://github.com/user-attachments/assets/83577e6d-2659-4f4e-96dd-c8cee29e5188)

## Pagination:
![Screenshot 2025-04-13 232715](https://github.com/user-attachments/assets/d7ad34d3-623c-4b80-9dcd-db4f13480f18)

## Searching:
![Screenshot 2025-04-13 232819](https://github.com/user-attachments/assets/2e594fad-3ae8-450c-8024-b4da50a0587b)

## QR scanning:

![qr](https://github.com/user-attachments/assets/357ece61-5de8-4d7a-ac67-317190da842e)

## Scan redirection:

![qr scan](https://github.com/user-attachments/assets/d23e7bac-d7d3-4efd-986b-0c605a876021)


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm

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


