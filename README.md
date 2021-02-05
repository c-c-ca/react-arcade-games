# Classic Arcade Games

## Getting Started

1. Install project dependencies: `npm install`.
2. Create a new file `config/dev.js` to export API credentials for development.

```
// config/dev.js

module.exports = {
  googleClientID: <GOOGLE_CLIENT_ID>,
  googleClientSecret: <GOOGLE_CLIENT_SECRET>,
  mongoURI: <MONGO_URI>,
  cookieKey: <COOKIE_KEY>,
};
```

3. Start the development environment: `npm run dev`.
