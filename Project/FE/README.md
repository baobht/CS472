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

## License

MIT

---

**Made for CS472 - ReviewMe Project**
