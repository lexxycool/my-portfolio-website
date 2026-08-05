# CloudHub Portfolio

This project uses React with Vite.

## Scripts

- npm run dev: start the local development server.
- npm run dev:server: start the SMTP API server for contact form submission.
- npm start: start the SMTP API server.
- npm run build: create a production build in the dist folder.
- npm run preview: preview the production build locally.

## Local Development

1. Install dependencies:

	npm install

2. Start dev server:

	npm run dev

3. In a second terminal, start the SMTP API server:

	npm run dev:server

4. Open the shown local URL in your browser.

## Contact SMTP Setup

1. Copy .env.example to .env.
2. Set values in .env:

	GMAIL_USER=your gmail address
	GMAIL_APP_PASSWORD=your gmail app password
	CONTACT_TO_EMAIL=destination inbox

The contact form posts to /api/contact, and the backend sends email through Gmail SMTP using Nodemailer.

## Build

Run:

npm run build

Vite outputs optimized assets to the dist folder.
