require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authroute.js");
const taskRoutes = require("./routes/taskroute.js");
const { specs, swaggerUi } = require('./swagger');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Task Tracker API Documentation',
}));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome endpoint
 *     description: Returns a welcome message for the Task Tracker API
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: Welcome to the Task Tracker API
 */
app.get("/", (req, res) => {
  res.send("Welcome to the Task Tracker API");
});
