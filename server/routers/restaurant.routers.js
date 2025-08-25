import express from "express";
import restaurantController from "../controllers/restaurant.controller.js";
import authMiddleware from "../middleware/authJwt.js";

const router = express.Router();

// POST http://localhost:5000/api/v1/restaurants
router.post(
  "/",
  authMiddleware.verifyToken,
  authMiddleware.isModOrAdmin,
  authMiddleware.isAdmin,
  restaurantController.create
);

// GET http://localhost:5000/api/v1/restaurants
router.get("/", authMiddleware.verifyToken, restaurantController.getAll); // public

// GET http://localhost:5000/api/v1/restaurants/:id
router.get("/:id", authMiddleware.verifyToken, restaurantController.getById); // public

// PUT http://localhost:5000/api/v1/restaurants/:id
router.put(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.isModOrAdmin,
  authMiddleware.isAdmin,
  restaurantController.update
);

// DELETE http://localhost:5000/api/v1/restaurants/:id
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  restaurantController.deleteById
);

export default router;
