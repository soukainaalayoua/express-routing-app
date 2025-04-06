const express = require("express");
const app = express();
const path = require("path");

// Serve static files (like CSS)
app.use(express.static(path.join(__dirname, "public")));

// Custom middleware to check working hours (Monday to Friday, 9am to 5pm)
const checkWorkingHours = (req, res, next) => {
  const currentTime = new Date();
  const currentDay = currentTime.getDay(); // 0 for Sunday, 6 for Saturday
  const currentHour = currentTime.getHours();

  // Working hours: Monday to Friday (1-5), 9 AM to 5 PM
  if (
    currentDay >= 1 &&
    currentDay <= 5 &&
    currentHour >= 9 &&
    currentHour < 17
  ) {
    next(); // Proceed if within working hours
  } else {
    res.send(
      "The website is only available during working hours (Mon-Fri, 9AM-5PM)."
    );
  }
};

// Use middleware for all routes
app.use(checkWorkingHours);

// Route for Home Page
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><link rel="stylesheet" href="/style.css"></head>
      <body>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
        <h1>Welcome to the Home Page!</h1>
      </body>
    </html>
  `);
});

// Route for Our Services Page
app.get("/services", (req, res) => {
  res.send(`
    <html>
      <head><link rel="stylesheet" href="/style.css"></head>
      <body>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
        <h1>Our Services</h1>
        <p>We offer various services including web development, design, and more!</p>
      </body>
    </html>
  `);
});

// Route for Contact Us Page
app.get("/contact", (req, res) => {
  res.send(`
    <html>
      <head><link rel="stylesheet" href="/style.css"></head>
      <body>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
        <h1>Contact Us</h1>
        <p>Email us at contact@example.com</p>
      </body>
    </html>
  `);
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
app.set("view engine", "ejs");
