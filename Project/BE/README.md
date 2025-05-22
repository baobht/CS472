# ReviewMe Frontend

This is the **frontend** for the ReviewMe application, built with **React** and **TypeScript** using **Vite**.

## Features

- Browse products by category
- Search products by name
- View product details and customer reviews
- Add, edit, and delete reviews
- AI-powered comment generation for reviews
- Add and edit products (admin)
- Responsive and modern UI

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd Project/FE
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the `FE` folder with the following content:

   ```
   VITE_API_URL=http://localhost:3000
   ```

   Adjust the URLs as needed for your backend.

### Running the App

- **Development:**

  ```bash
  npm run dev
  # or
  yarn dev
  ```

- **Production Build:**

  ```bash
  npm run build
  # or
  yarn build
  ```

- **Preview Production Build:**
  ```bash
  npm run preview
  # or
  yarn preview
  ```

## Project Structure

```
FE/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and static files
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components (routes)
│   ├── main.tsx        # App entry point
│   └── index.css       # Global styles
├── .env                # Environment variables
├── package.json
└── README.md
```

## Environment Variables

- `VITE_API_URL_DEV`: Backend API URL for development
- `VITE_API_URL_PROD`: Backend API URL for production

The app automatically selects the correct API URL based on the environment.

## Useful Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

## Notes

- Make sure the backend server is running and accessible at the API URL you provide.
- For AI-powered comment generation, ensure the backend is configured with the necessary AI API keys.

---

# ReviewMe Backend

This is the **backend** for the ReviewMe application, built with **Node.js**, **Express**, and **TypeScript**.

## Features

- RESTful API for products and reviews
- Product category and search filtering
- Customer review CRUD operations
- Product average rating calculation
- AI-powered comment generation endpoint
- MongoDB database integration
- Logging with Winston
- Environment-based configuration

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd Project/BE
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the `BE` folder with the following content:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/reviewme
   GEMINI_API_KEY=your-gemini-api-key
   NODE_ENV=development
   ```

   Adjust the values as needed for your environment.

### Running the App

- **Development:**

  ```bash
  npm run dev
  # or
  yarn dev
  ```

- **Production Build:**

  ```bash
  npm run build
  # or
  yarn build
  ```

- **Start Production Server:**
  ```bash
  npm start
  # or
  yarn start
  ```

## Project Structure

```
BE/
├── src/
│   ├── config/         # Configuration files (db, logger, etc.)
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Express middlewares
│   ├── models/         # Mongoose models
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic and DB access
│   ├── validators/     # Request validation
│   ├── app.ts          # Express app setup
│   └── server.ts       # App entry point
├── logs/               # Log files
├── .env                # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

- `PORT`: Port for the server (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `GEMINI_API_KEY`: API key for AI comment generation
- `NODE_ENV`: Environment mode (`development` or `production`)

## Useful Scripts

- `npm run dev` – Start development server with hot reload
- `npm run build` – Compile TypeScript to JavaScript
- `npm start` – Start production server

## Notes

- Ensure MongoDB is running and accessible at the URI you provide.
- For AI-powered comment generation, set up your Gemini API key in `.env`.
- Error logs are written to `logs/error.log`.

## License

MIT

---

**Made for CS472 - ReviewMe Project**
