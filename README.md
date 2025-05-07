# Full-Stack Application with Railway Deployment

A full-stack Node.js application with PostgreSQL database, ready for deployment on Railway.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```
PORT=3000
DATABASE_URL=your_railway_postgresql_url
NODE_ENV=development
```

3. Railway Setup:
- Create a free account at [railway.app](https://railway.app)
- Create a new project
- Add a PostgreSQL plugin to your project
- Copy the PostgreSQL connection URL to your `.env` file
- Add your `RAILWAY_TOKEN` to your GitHub repository secrets

## Development

Run the development server:
```bash
npm run dev
```

## Production Deployment

The application is configured to automatically deploy to Railway when you push to the main branch.

1. Make sure your GitHub repository is connected to Railway
2. Add your Railway token to GitHub repository secrets as `RAILWAY_TOKEN`
3. Push to main branch to trigger deployment

## API Endpoints

- `GET /`: Welcome message
- `GET /health`: Health check endpoint

## Tech Stack

- Node.js/Express
- PostgreSQL
- Railway for deployment
- GitHub Actions for CI/CD