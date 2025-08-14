import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import restaurantRouter from "./routers/restaurant.routers.js";
import authRouter from "./routers/auth.router.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sequelize
import db from "./models/index.js";
const Role = db.Role;

// Function to initialize roles
const initRole = async () => {
  try {
    await Role.findOrCreate({ where: { id: 1 }, defaults: { roleName: "user" } });
    await Role.findOrCreate({ where: { id: 2 }, defaults: { roleName: "moderator" } });
    await Role.findOrCreate({ where: { id: 3 }, defaults: { roleName: "admin" } });
    console.log("Initial roles created");
  } catch (err) {
    console.error("Error initializing roles:", err);
  }
};

// Sync database
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
  initRole(); // run after syncing
});

// Homepage
app.get("/", (req, res) => {
  res.send("Restaurant Restful API");
});

// Enable CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

// Routers
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/auth", authRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
