// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const winston = require("winston");

const app = express();
const port = 4000;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console(),
    // eslint-disable-next-line no-undef
    new winston.transports.File({ filename: path.join(__dirname, "server.log") }),
  ],
});

// Loggermiddleware
app.use((req, res, next) => {
  try {
    logger.info(`Received ${req.method} request to ${req.url} from ${req.ip}`);
  } catch (error) {
    console.error("Error logging request:", error);
  }

  next();
});

// Middleware for cors
app.use((req, res, next) => {
  // const allowedDomainRegex = /^https:\/\/api\.allorigins\.win/;
  // const origin = req.headers.origin;

  // if (origin && allowedDomainRegex.test(origin)) {
  //   res.header("Access-Control-Allow-Origin", origin);
  // }

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

// Serve static files from the 'dist' directory
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "..", "dist")));

// // Handle all paths SPA and return the index.html file
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    // eslint-disable-next-line no-undef
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
