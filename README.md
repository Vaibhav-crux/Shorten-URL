# URL Shortener Microservice

This project is a simple URL shortener microservice built with Node.js and Express. It provides a basic API for creating short URLs and redirecting users to the original URLs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installing

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running `npm install`.

### Running the Application

1. Start the server by running `node index.js`.
2. The server will start, and you can access it at `http://localhost:3000`.

## API Endpoints

### GET /api/hello

Returns a greeting message.

Example response:
```json
{
 "greeting": "hello API"
}
```

### POST /api/shorturl

Creates a short URL for the provided original URL.

**Request Body:**
```json
{
 "url": "http://example.com"
}
```

**Response:**
```json
{
 "original_url": "http://example.com",
 "short_url": "12345"
}
```

### GET /api/shorturl/:shortUrl

Redirects to the original URL associated with the provided short URL.

**Response:**
- Redirects to the original URL.

## Built With

- [Express](http://expressjs.com/) - The web framework used.
- [body-parser](https://www.npmjs.com/package/body-parser) - Middleware to parse incoming request bodies.
- [cors](https://www.npmjs.com/package/cors) - Middleware to enable CORS.
- [dns](https://nodejs.org/api/dns.html) - Node.js DNS module for domain name resolution.
- [url](https://nodejs.org/api/url.html) - Node.js URL module for URL resolution and parsing.
