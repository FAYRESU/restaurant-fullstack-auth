import restaurantController from "../controllers/restaurant.controller.js";

import express from "express";
const router = express.Router();

//POST https//localhost:5000/api/v1/restaurants
router.post("/", restaurantController.create);

//GET https//localhost:5000/api/v1/restaurants
router.get("/", restaurantController.getAll);

//GET https//localhost:5000/api/v1/restaurants/:id
router.get("/:id", restaurantController.getById);

//PUT https//localhost:5000/api/v1/restaurants/:id
router.put("/:id", restaurantController.update);

//PUT https//localhost:5000/api/v1/restaurants/:id
router.delete("/:id", restaurantController.deleteById);
export default router;
